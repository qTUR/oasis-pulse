const Motion=(()=>{
 const STEP=1/120;
 const seeds=[813,1277,2099,3167,4229,5393,6427,7541,8627,9733,10859,11969,13099,14221,15349,16477,17609,18731,19843,20963,22093,23203,24329,25453];
 function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
 function course(index,seed=seeds[index]||index*971+13){let r=random(seed),region=Math.min(5,Math.floor(index/4));return{index,seed,region,length:240+(index%4)*65+region*45,amplitude:3.0+region*.3,period:52+(index%4)*3,phase:r()*.7,wind:region===3?2.4:0,oases:[30,145,280,410],gates:[85,190,300,435],secret:seed%11===0}}
 function height(x,l){return 3.2+l.amplitude*Math.cos(x*2*Math.PI/l.period+l.phase)+.65*Math.sin(x*.052)}
 function slope(x,l){return-l.amplitude*2*Math.PI/l.period*Math.sin(x*2*Math.PI/l.period+l.phase)+.65*.052*Math.cos(x*.052)}
 function begin(l,p={}){return{x:0,y:height(0,l)+.72,vx:0,vy:0,t:0,held:false,ground:true,started:false,flow:0,launches:0,perfect:0,dew:0,fruit:0,seen:[],win:false,powers:{...p},flight:0,bestFlight:0,burrow:0,combo:0,checkpoint:0}}
 function tick(s,l,held){if(s.win)return s;s.t+=STEP;const up=!held&&s.held;s.held=held;s.perfect=Math.max(0,s.perfect-STEP);const k=slope(s.x,l);
 if(!s.started){if(!held)return s;s.started=true;s.vx=9}
 if(s.ground){const force=-k*21+(held?5.2:0),drag=held?.025:.13;s.vx=Math.max(held?3:0,Math.min(s.powers.speed?30:26,s.vx+(force-drag*s.vx)*STEP));s.flow=Math.min(1,Math.max(0,s.flow+(held&&k<.04?.45:-.2)*STEP));s.burrow+=(held?.68-s.burrow:-s.burrow)*.12;
 if(up){s.ground=false;s.vy=Math.max(4,5+s.vx*Math.max(0,k)*1.3+s.flow*4+(s.powers.lift?1.8:0));s.launches++;s.flight=0;if(k>.14&&s.flow>.25){s.perfect=.55;s.combo++;s.vy+=2}else s.combo=0;s.flow=0}else{s.x+=s.vx*STEP;s.y=height(s.x,l)+.72}}
 else{s.burrow*=.92;let gravity=held?28:s.powers.glide?10.5:15.5;s.vy+=(l.wind*Math.max(0,Math.sin(s.x*.06))-gravity)*STEP;s.x+=s.vx*STEP;s.y+=s.vy*STEP;s.flight+=STEP;s.bestFlight=Math.max(s.bestFlight,s.flight);if(s.y<=height(s.x,l)+.72){s.y=height(s.x,l)+.72;s.ground=true;s.vx=Math.max(6,s.vx+Math.max(0,-s.vy)*.12);s.vy=0;if(l.region===1&&Math.sin(s.x*.11)>.5){s.vy=7;s.ground=false}}}
 for(let i=Math.max(0,Math.floor(s.x/12)-1);i<=Math.floor(s.x/12)+1;i++){if(s.seen.includes(i))continue;let x=i*12+8,y=height(x,l)+2.2+Math.max(0,Math.sin(i*1.7))*4;let range=s.powers.magnet?6:2.6;if(Math.hypot(s.x-x,s.y-y)<range){s.seen.push(i);s.dew++;if(i%5===3)s.fruit++}}
 if(l.region===2&&s.ground&&held&&s.flow>.8){s.vx*=.997}
 if(l.region===4&&!s.ground)s.vx=Math.min(29,s.vx+Math.sin(s.t*2)*STEP);
 if(l.region===5&&s.ground&&!held)s.vx=Math.max(4.8,s.vx-.8*STEP);
 s.checkpoint=Math.floor(s.x/60)*60;if(s.x>=l.length){s.win=true;s.x=l.length}return s}
 function simulate(l,profile='medium',powers={}){let s=begin(l,powers),r=random(l.seed+profile.length),held=true,next=0;for(let f=0;f<120*600&&!s.win;f++){if(s.t>=next){let threshold=profile==='strong'?.16:profile==='medium'?.08:-.06;held=s.ground?slope(s.x,l)<threshold||s.flow<.28:s.vy< -1;next=s.t+({strong:.06,medium:.18,weak:.45}[profile])*(.7+r()*.6)}tick(s,l,held)}return s}
 return{STEP,seeds,random,course,height,slope,begin,tick,simulate};
})();
if(typeof module!=='undefined')module.exports=Motion;
