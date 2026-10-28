'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const chapters = ['Prologue', 'The Beginning', 'The Struggle', 'The Breakthrough', 'England Captain', 'Tottenham Legend', 'Bayern Era', 'The Ballon d’Or']

export default function Home() {
  const hero = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    const ctx = gsap.context(() => {
      gsap.to('.hero-image', { scale: 1.18, yPercent: 8, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-copy', { yPercent: -35, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } }))
    }, hero)
    const onScroll = () => setProgress(Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { ctx.revert(); lenis.destroy(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const jump = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }
  return <main>
    <header className="nav"><button className="monogram" onClick={() => jump('prologue')}>HK<span>•</span></button><div className="nav-center"><span>THE PURSUIT OF GOLD</span><i /></div><div className="nav-right"><span className="year">1993 — PRESENT</span><button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Open chapter menu"><b /><b /><b /></button></div></header>
    <div className="progress"><span style={{ width: `${progress}%` }} /></div>
    {menu && <aside className="chapter-menu"><button className="close" onClick={() => setMenu(false)}>×</button><small>CHAPTERS</small>{chapters.map((c, i) => <button key={c} onClick={() => jump(i === 0 ? 'prologue' : 'beginning')}>{String(i).padStart(2, '0')} <span>{c}</span></button>)}</aside>}
    <section id="prologue" ref={hero} className="hero">
      <div className="hero-image" aria-label="Editorial placeholder for licensed Harry Kane portrait"><div className="image-label">EDITORIAL IMAGE / LICENSED ASSET PENDING</div></div>
      <div className="hero-shade" /><div className="hero-copy"><p className="eyebrow">AN UNOFFICIAL DOCUMENTARY · 01</p><h1>HARRY<br /><em>KANE.</em></h1><div className="hero-bottom"><p>One career.<br />Countless goals.<br />A legacy still being written.</p><span className="scroll-cue">SCROLL TO BEGIN <i>↓</i></span></div></div>
    </section>
    <section id="beginning" className="chapter chapter-one"><div className="chapter-number">01 <span>—</span> 1993—2004</div><div className="chapter-content reveal"><p className="eyebrow">CHAPTER ONE</p><h2>THE<br /><em>BEGINNING.</em></h2><p className="lede">Before the records, before the captain’s armband, there was a boy from north London with a ball at his feet and an unshakeable belief.</p></div><div className="chapter-art"><div className="orbit" /><span>ARCHIVE<br />01 / 07</span></div></section>
    <section className="quote-section"><p className="eyebrow reveal">THE LONG ROAD</p><blockquote className="reveal">“You have to believe<br />you can do it.”</blockquote><p className="quote-credit reveal">— HARRY KANE</p></section>
    <section className="next-tease"><p className="eyebrow">NEXT CHAPTER</p><h2>THE<br /><em>STRUGGLE.</em></h2><span>04—14</span></section>
    <footer><span>HK / THE PURSUIT OF GOLD</span><span>UNOFFICIAL FAN DOCUMENTARY</span><span>SCROLL 01—08</span></footer>
  </main>
}
