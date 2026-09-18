document.querySelector('.menu-toggle')?.addEventListener('click',function(){const nav=document.querySelector('.nav');const open=nav.classList.toggle('open');this.setAttribute('aria-expanded',String(open));this.textContent=open?'Fermer':'Menu'});

const orbit=document.querySelector('[data-stack-orbit]');
if(orbit){
  const logos=[...orbit.querySelectorAll('.stack-logo')];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking=false;
  const renderOrbit=()=>{
    const rect=orbit.getBoundingClientRect();
    const travel=window.innerHeight+rect.height;
    const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/travel));
    const rotation=reduced.matches?0:(progress-.5)*150;
    const radius=Math.max(132,Math.min(285,orbit.clientWidth*.34));
    logos.forEach((logo,index)=>{
      const angle=Number(logo.dataset.angle)+rotation;
      const wobble=reduced.matches?0:Math.sin(progress*Math.PI*2+index)*8;
      logo.style.transform=`translate(-50%,-50%) rotate(${angle}deg) translateX(${radius+wobble}px) rotate(${-angle}deg)`;
    });
    ticking=false;
  };
  const requestRender=()=>{if(!ticking){requestAnimationFrame(renderOrbit);ticking=true}};
  renderOrbit();
  addEventListener('scroll',requestRender,{passive:true});
  addEventListener('resize',requestRender);
  reduced.addEventListener?.('change',requestRender);
}
