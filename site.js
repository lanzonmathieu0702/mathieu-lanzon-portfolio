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

const neonSections=[...document.querySelectorAll('.neon-section')];
if(neonSections.length){
  let neonTicking=false;
  const renderNeon=()=>{
    neonSections.forEach(section=>{
      const rect=section.getBoundingClientRect();
      const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height*.35)));
      section.style.setProperty('--neon-level',progress.toFixed(3));
      section.style.setProperty('--neon-opacity',(0.15+progress*0.85).toFixed(3));
      section.style.setProperty('--neon-clip',`${(100-progress*100).toFixed(1)}%`);
    });
    neonTicking=false;
  };
  const requestNeon=()=>{if(!neonTicking){requestAnimationFrame(renderNeon);neonTicking=true}};
  renderNeon();
  addEventListener('scroll',requestNeon,{passive:true});
  addEventListener('resize',requestNeon);
}

const revealCards=[...document.querySelectorAll('.reveal-grid .project-card')];
if(revealCards.length){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){revealCards.forEach(card=>card.classList.add('is-visible'));}
  else{
    let lastScrollY=scrollY,cardTicking=false;
    revealCards.forEach((card,index)=>card.style.transitionDelay=`${index*120}ms`);
    const renderCards=()=>{
      const goingDown=scrollY>=lastScrollY;
      revealCards.forEach((card,index)=>{
        const rect=card.getBoundingClientRect();
        if(goingDown&&rect.top<innerHeight*(.91-index*.015)&&rect.bottom>0)card.classList.add('is-visible');
        if(!goingDown&&rect.top>innerHeight*(.2+index*.035))card.classList.remove('is-visible');
      });
      lastScrollY=scrollY;cardTicking=false;
    };
    const requestCards=()=>{if(!cardTicking){requestAnimationFrame(renderCards);cardTicking=true}};
    renderCards();addEventListener('scroll',requestCards,{passive:true});addEventListener('resize',requestCards);
  }
}
