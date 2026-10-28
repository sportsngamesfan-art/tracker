import { test, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { CareerQuiz } from '../app/interactive-zone.tsx'
import { FanPoll, MilestoneExplorer, NumberNine, StatExplorer } from '../app/film-interactions.tsx'
import { Origins } from '../app/origins.tsx'

const dom = new JSDOM('<!doctype html><html><body></body></html>', {url:'https://documentary.test'})
Object.assign(globalThis, {window:dom.window,document:dom.window.document,HTMLElement:dom.window.HTMLElement,localStorage:dom.window.localStorage,React,IS_REACT_ACT_ENVIRONMENT:true})
afterEach(()=>{cleanup();localStorage.clear()})

test('quiz locks answers, tracks a mixed score, finishes and resets',()=>{
  const v=render(React.createElement(CareerQuiz))
  fireEvent.click(v.getByRole('button',{name:'A Ridgeway Rovers'}))
  assert.ok(v.getByRole('button',{name:'A Ridgeway Rovers'}).disabled)
  fireEvent.click(v.getByRole('button',{name:/NEXT QUESTION/}))
  fireEvent.click(v.getByRole('button',{name:'A Norwich City'}))
  assert.match(v.container.textContent,/Not quite/)
  fireEvent.click(v.getByRole('button',{name:/NEXT QUESTION/}))
  fireEvent.click(v.getByRole('button',{name:'C 280'}))
  fireEvent.click(v.getByRole('button',{name:/NEXT QUESTION/}))
  fireEvent.click(v.getByRole('button',{name:'D 36'}))
  fireEvent.click(v.getByRole('button',{name:/SEE YOUR SCORE/}))
  assert.match(v.getByRole('heading',{level:3}).textContent,/3\s*\/\s*4/)
  fireEvent.click(v.getByRole('button',{name:/PLAY AGAIN/}))
  assert.match(v.container.textContent,/SCORE\s*0/)
})
test('statistics change competition, denominator and rate together',()=>{
  const v=render(React.createElement(StatExplorer))
  fireEvent.change(v.getByLabelText('Explore the numbers'),{target:{value:'2'}})
  assert.match(v.container.textContent,/36GOALS32APPEARANCES1.13/)
  assert.match(v.container.textContent,/Bundesliga only · 2023\/24/)
})
test('poll persists a local choice and supports changing the vote',()=>{
  const v=render(React.createElement(FanPoll))
  fireEvent.click(v.getByRole('button',{name:/His resilience/}))
  assert.equal(localStorage.getItem('hk-poll-v2'),'2')
  fireEvent.click(v.getByRole('button',{name:/His creativity/}))
  assert.equal(localStorage.getItem('hk-poll-v2'),'1')
  assert.match(v.container.textContent,/not a public poll result/)
})
test('milestones and childhood next/previous reveal matching content',()=>{
  const m=render(React.createElement(MilestoneExplorer))
  fireEvent.click(m.getByRole('button',{name:'2012'}))
  assert.match(m.getByRole('heading').textContent,/broken foot/)
  m.unmount()
  const o=render(React.createElement(Origins))
  fireEvent.click(o.getByRole('button',{name:/NEXT MOMENT/}))
  assert.match(o.getByRole('heading',{level:3}).textContent,/A BALL/)
  fireEvent.click(o.getByRole('button',{name:/PREVIOUS/}))
  assert.match(o.getByRole('heading',{level:3}).textContent,/EAST LONDON/)
})
test('number nine reveals and closes a sourced easter egg',()=>{
  const v=render(React.createElement(NumberNine));const b=v.getByRole('button')
  fireEvent.click(b);assert.equal(b.getAttribute('aria-expanded'),'true');assert.match(v.container.textContent,/playmaking/)
  fireEvent.click(b);assert.equal(b.getAttribute('aria-expanded'),'false')
})
