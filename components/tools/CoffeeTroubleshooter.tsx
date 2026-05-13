"use client"

import { useState, useCallback } from "react"
import Link from "next/link"

type NodeId = string

interface Option {
  label: string
  nextId: NodeId
}

interface QuestionNode {
  type: "question"
  id: NodeId
  question: string
  options: Option[]
}

interface DiagnosisNode {
  type: "diagnosis"
  id: NodeId
  title: string
  explanation: string
  fixes: string[]
  relatedTool?: { label: string; slug: string }
}

type TroubleshootNode = QuestionNode | DiagnosisNode

const NODES: Record<NodeId, TroubleshootNode> = {
  start: {
    type: "question",
    id: "start",
    question: "What is the main problem with your coffee?",
    options: [
      { label: "Bitter or harsh", nextId: "bitter_method" },
      { label: "Sour or acidic", nextId: "sour_method" },
      { label: "Weak, watery, or flat", nextId: "weak_cause" },
      { label: "Too strong or intense", nextId: "strong_cause" },
      { label: "Muddy, gritty, or cloudy", nextId: "diag_muddy" },
    ],
  },

  // BITTER PATH
  bitter_method: {
    type: "question",
    id: "bitter_method",
    question: "What brew method are you using?",
    options: [
      { label: "Espresso", nextId: "bitter_espresso" },
      { label: "Pour over or V60", nextId: "bitter_pourover" },
      { label: "French press", nextId: "bitter_frenchpress" },
      { label: "AeroPress or drip machine", nextId: "bitter_aeropress" },
    ],
  },
  bitter_espresso: {
    type: "question",
    id: "bitter_espresso",
    question: "How long does your espresso shot take from first drip to full yield?",
    options: [
      { label: "Under 20 seconds (runs very fast)", nextId: "diag_espresso_fast_bitter" },
      { label: "20 to 30 seconds (normal range)", nextId: "bitter_espresso_normal" },
      { label: "Over 35 seconds (runs very slow)", nextId: "diag_espresso_over" },
    ],
  },
  bitter_espresso_normal: {
    type: "question",
    id: "bitter_espresso_normal",
    question: "Did you recently change your grind setting?",
    options: [
      { label: "Yes, I went finer recently", nextId: "diag_espresso_grind_fine" },
      { label: "No change, or I am not sure", nextId: "diag_espresso_temp" },
    ],
  },
  bitter_pourover: {
    type: "question",
    id: "bitter_pourover",
    question: "How long does your brew take from first pour to complete drawdown?",
    options: [
      { label: "Under 2.5 minutes (drains quickly)", nextId: "diag_pourover_fast_bitter" },
      { label: "2.5 to 3.5 minutes (target range)", nextId: "bitter_pourover_bloom" },
      { label: "Over 4 minutes (drains slowly)", nextId: "diag_pourover_slow" },
    ],
  },
  bitter_pourover_bloom: {
    type: "question",
    id: "bitter_pourover_bloom",
    question: "Do you bloom your grounds before the main pour?",
    options: [
      { label: "Yes, 30 to 45 seconds", nextId: "diag_pourover_temp" },
      { label: "No, I skip the bloom", nextId: "diag_pourover_no_bloom_bitter" },
    ],
  },
  bitter_frenchpress: {
    type: "question",
    id: "bitter_frenchpress",
    question: "How long do you steep your French press?",
    options: [
      { label: "Less than 3 minutes", nextId: "diag_frenchpress_bitter_short" },
      { label: "Around 4 minutes", nextId: "bitter_frenchpress_temp" },
      { label: "5 minutes or longer", nextId: "diag_frenchpress_long" },
    ],
  },
  bitter_frenchpress_temp: {
    type: "question",
    id: "bitter_frenchpress_temp",
    question: "What temperature is your water when you brew?",
    options: [
      { label: "Boiling (100C / 212F)", nextId: "diag_frenchpress_boiling" },
      { label: "Off-boil, 92 to 96C (197 to 205F)", nextId: "diag_frenchpress_grind_coarser" },
      { label: "I am not sure", nextId: "diag_frenchpress_combo" },
    ],
  },
  bitter_aeropress: {
    type: "question",
    id: "bitter_aeropress",
    question: "How long do you steep before pressing?",
    options: [
      { label: "Under 60 seconds", nextId: "diag_aeropress_short_bitter" },
      { label: "1 to 2 minutes", nextId: "diag_aeropress_grind_bitter" },
      { label: "Over 2 minutes", nextId: "diag_aeropress_long_steep" },
    ],
  },

  // SOUR PATH
  sour_method: {
    type: "question",
    id: "sour_method",
    question: "What brew method are you using?",
    options: [
      { label: "Espresso", nextId: "diag_espresso_sour" },
      { label: "Pour over or V60", nextId: "sour_pourover" },
      { label: "French press", nextId: "sour_frenchpress" },
      { label: "AeroPress", nextId: "diag_aeropress_sour" },
    ],
  },
  sour_pourover: {
    type: "question",
    id: "sour_pourover",
    question: "How long does your pour over take from first pour to drawdown?",
    options: [
      { label: "Fast, under 2 minutes", nextId: "diag_pourover_sour_fast" },
      { label: "About 3 minutes", nextId: "sour_pourover_bloom" },
      { label: "Over 4 minutes", nextId: "diag_pourover_sour_slow" },
    ],
  },
  sour_pourover_bloom: {
    type: "question",
    id: "sour_pourover_bloom",
    question: "Do you bloom your grounds before the main pour?",
    options: [
      { label: "Yes, 30 to 45 seconds", nextId: "diag_pourover_sour_temp" },
      { label: "No bloom or very brief", nextId: "diag_pourover_sour_no_bloom" },
    ],
  },
  sour_frenchpress: {
    type: "question",
    id: "sour_frenchpress",
    question: "How long do you steep?",
    options: [
      { label: "Under 3 minutes", nextId: "diag_frenchpress_sour_short" },
      { label: "Around 4 minutes", nextId: "diag_frenchpress_sour_temp" },
      { label: "5 minutes or more", nextId: "diag_frenchpress_sour_grind" },
    ],
  },

  // WEAK PATH
  weak_cause: {
    type: "question",
    id: "weak_cause",
    question: "How does the weakness present itself?",
    options: [
      { label: "Thin and watery, no body", nextId: "weak_ratio" },
      { label: "No real flavour but not watery", nextId: "weak_extraction" },
      { label: "Flavour disappears too quickly", nextId: "diag_stale" },
    ],
  },
  weak_ratio: {
    type: "question",
    id: "weak_ratio",
    question: "How much coffee do you use per cup (around 250ml)?",
    options: [
      { label: "Less than 1 tablespoon (under 6g)", nextId: "diag_weak_ratio" },
      { label: "1 to 2 tablespoons (6 to 12g)", nextId: "weak_ratio_method" },
      { label: "More than 2 tablespoons", nextId: "diag_weak_coarse" },
    ],
  },
  weak_ratio_method: {
    type: "question",
    id: "weak_ratio_method",
    question: "What brew method?",
    options: [
      { label: "Drip machine (full pot)", nextId: "diag_weak_drip" },
      { label: "Pour over or V60", nextId: "diag_weak_pourover_ratio" },
      { label: "French press or AeroPress", nextId: "diag_weak_fp_ratio" },
    ],
  },
  weak_extraction: {
    type: "question",
    id: "weak_extraction",
    question: "What brew method?",
    options: [
      { label: "Pour over or V60", nextId: "diag_weak_temp_pourover" },
      { label: "Drip machine", nextId: "diag_weak_drip_descale" },
      { label: "French press", nextId: "diag_weak_fp_temp" },
      { label: "AeroPress", nextId: "diag_aeropress_weak" },
    ],
  },

  // STRONG PATH
  strong_cause: {
    type: "question",
    id: "strong_cause",
    question: "When did the coffee start tasting too strong?",
    options: [
      { label: "Always, the recipe is just intense", nextId: "strong_recipe" },
      { label: "After I changed something recently", nextId: "strong_change" },
    ],
  },
  strong_recipe: {
    type: "question",
    id: "strong_recipe",
    question: "What would you like to adjust first?",
    options: [
      { label: "Use less coffee (adjust dose)", nextId: "diag_strong_dose" },
      { label: "Make the grind slightly coarser", nextId: "diag_strong_grind" },
      { label: "Shorten the steep or brew time", nextId: "diag_strong_time" },
    ],
  },
  strong_change: {
    type: "question",
    id: "strong_change",
    question: "What did you change recently?",
    options: [
      { label: "Bought a new, darker roast", nextId: "diag_strong_roast" },
      { label: "Changed grinder or grind setting", nextId: "diag_strong_grind_change" },
      { label: "Changed my dose or brew ratio", nextId: "diag_strong_dose_change" },
    ],
  },

  // DIAGNOSES
  diag_espresso_fast_bitter: {
    type: "diagnosis",
    id: "diag_espresso_fast_bitter",
    title: "Shot running too fast",
    explanation: "A fast shot (under 20 seconds) usually causes sour, not bitter, flavour. If yours is bitter and fast, the likely cause is too much coffee in the portafilter or a channelling issue where water bypasses most of the puck.",
    fixes: [
      "Check your dose: a standard single is 7 to 9g, a double is 14 to 18g.",
      "If the dose is correct, tamp more evenly and firmly to reduce channelling.",
      "Grind 1 click finer to slow the shot and allow more even extraction.",
    ],
    relatedTool: { label: "Espresso Ratio Calculator", slug: "espresso-ratio-calculator" },
  },
  diag_espresso_over: {
    type: "diagnosis",
    id: "diag_espresso_over",
    title: "Shot running too slow (over-extracted)",
    explanation: "A shot that takes more than 35 seconds is over-extracting, which produces bitter, dry, and harsh flavour. The grind is too fine, the dose is too high, or both.",
    fixes: [
      "Grind 1 to 2 clicks coarser and pull a test shot immediately.",
      "If you changed nothing recently, also check whether your dose crept up.",
      "Target 20 to 30 seconds for a standard espresso yield of twice the dose weight.",
    ],
    relatedTool: { label: "Espresso Dial-In Calculator", slug: "espresso-dial-in" },
  },
  diag_espresso_grind_fine: {
    type: "diagnosis",
    id: "diag_espresso_grind_fine",
    title: "Grind became too fine after adjustment",
    explanation: "Going finer increases resistance and slows the shot, leading to over-extraction and bitterness. One click is often the difference between a balanced shot and an over-extracted one.",
    fixes: [
      "Coarsen your grind by 1 click and pull a test shot.",
      "Target a 20 to 30 second shot at your usual dose and yield.",
      "If the shot is now too sour, move halfway between your old and new setting.",
    ],
    relatedTool: { label: "Grind Size Guide", slug: "grind-size-guide" },
  },
  diag_espresso_temp: {
    type: "diagnosis",
    id: "diag_espresso_temp",
    title: "Possible water temperature issue",
    explanation: "When shot time is normal but the taste is bitter without a recent grind change, water temperature above 96C is a common cause. Most espresso extracts best at 90 to 96C.",
    fixes: [
      "If your machine has temperature settings, lower it to 92 to 94C.",
      "For machines without adjustable temperature, run a blank shot (no coffee) before pulling to flush some heat.",
      "Dark roasts generally prefer 88 to 92C; light roasts prefer 92 to 96C.",
    ],
    relatedTool: { label: "Espresso Dial-In Calculator", slug: "espresso-dial-in" },
  },
  diag_espresso_sour: {
    type: "diagnosis",
    id: "diag_espresso_sour",
    title: "Under-extracted espresso",
    explanation: "Sour espresso is under-extracted. The water is not pulling enough from the grounds. This is usually a grind or ratio issue, not a technique problem.",
    fixes: [
      "Grind 1 click finer: finer grinds extract more and slow the shot.",
      "Aim for a 1:2 ratio: 18g in, 36g out in 25 to 30 seconds.",
      "Check water temperature: brewing below 88C significantly reduces extraction.",
    ],
    relatedTool: { label: "Espresso Ratio Calculator", slug: "espresso-ratio-calculator" },
  },
  diag_pourover_fast_bitter: {
    type: "diagnosis",
    id: "diag_pourover_fast_bitter",
    title: "Fast draw but still bitter",
    explanation: "Fast brew times usually cause under-extraction and sourness, not bitterness. If your pour over drains quickly and still tastes bitter, the most likely cause is water temperature too high or too much coffee relative to the volume.",
    fixes: [
      "Grind 1 to 2 steps finer to slow the drawdown and extend contact time.",
      "Check water temperature: brew at 92 to 94C, not boiling.",
      "Verify your ratio: 60g of coffee per litre of water is the standard starting point.",
    ],
    relatedTool: { label: "Pour Over Calculator", slug: "pour-over-calculator" },
  },
  diag_pourover_slow: {
    type: "diagnosis",
    id: "diag_pourover_slow",
    title: "Over-extracted due to slow drawdown",
    explanation: "A pour over taking over 4 minutes is over-extracting. The grind is too fine, causing water to pass slowly through the bed and pull out the bitter compounds that extract last.",
    fixes: [
      "Grind 2 steps coarser: this is the single most effective fix for slow pour over.",
      "Target a total brew time of 3 to 3.5 minutes for a standard V60 dose.",
      "Rinse your filter before brewing: an unrinsed paper filter can slightly restrict flow and affect flavour.",
    ],
    relatedTool: { label: "Pour Over Brew Timer", slug: "pour-over-timer" },
  },
  diag_pourover_temp: {
    type: "diagnosis",
    id: "diag_pourover_temp",
    title: "Water temperature may be too high",
    explanation: "When brew time is correct and you are blooming properly, bitterness often points to water temperature. Water above 96C tends to over-extract certain compounds, especially from darker roasts.",
    fixes: [
      "Brew at 92 to 94C: let your kettle cool for 30 to 60 seconds after boiling.",
      "For dark roasts, try 88 to 91C.",
      "A gooseneck kettle with temperature control removes this variable entirely.",
    ],
    relatedTool: { label: "Pour Over Calculator", slug: "pour-over-calculator" },
  },
  diag_pourover_no_bloom_bitter: {
    type: "diagnosis",
    id: "diag_pourover_no_bloom_bitter",
    title: "Skipping the bloom causes uneven extraction",
    explanation: "Without a bloom, CO2 trapped in fresh grounds repels the brewing water, causing some grounds to over-extract (bitter) while others are left under-extracted. Adding a bloom is the single biggest consistency improvement for pour over.",
    fixes: [
      "Pour twice the coffee weight in water (40ml for 20g coffee) and wait 30 to 45 seconds.",
      "You should see visible bubbling or the coffee bed rising: that is CO2 escaping.",
      "After the bloom, continue with your normal pour sequence.",
    ],
    relatedTool: { label: "Coffee Bloom Timer", slug: "coffee-bloom-timer" },
  },
  diag_frenchpress_bitter_short: {
    type: "diagnosis",
    id: "diag_frenchpress_bitter_short",
    title: "Steep too short with mismatched grind",
    explanation: "Under 3 minutes is too short for most French press recipes. Bitterness at this time usually means the grind is too fine: finer grinds extract faster but also release more bitter compounds into the liquid.",
    fixes: [
      "Coarsen your grind: French press needs a coarse grind, coarser than drip filter.",
      "Steep for exactly 4 minutes, then plunge slowly.",
      "If you cannot grind coarser, reduce steep time to 3 minutes and taste.",
    ],
    relatedTool: { label: "French Press Timer", slug: "french-press-timer" },
  },
  diag_frenchpress_long: {
    type: "diagnosis",
    id: "diag_frenchpress_long",
    title: "Steep time too long (over-extracted)",
    explanation: "A 5-minute or longer steep is the most common cause of bitter French press coffee. Unlike pour over, there is no filter to stop extraction: the grounds stay in contact with the liquid until you pour.",
    fixes: [
      "Steep for exactly 4 minutes, then plunge and pour immediately.",
      "After plunging, pour the entire batch out of the press: do not let it sit on the grounds.",
      "If 4 minutes still tastes bitter, coarsen your grind before reducing time further.",
    ],
    relatedTool: { label: "French Press Timer", slug: "french-press-timer" },
  },
  diag_frenchpress_boiling: {
    type: "diagnosis",
    id: "diag_frenchpress_boiling",
    title: "Water is too hot (boiling)",
    explanation: "Boiling water (100C) extracts bitter compounds more aggressively than slightly cooler water. French press brews best between 92 and 96C.",
    fixes: [
      "Let your kettle sit for 30 to 45 seconds after boiling before pouring.",
      "Target 93 to 96C: this range is forgiving enough that you do not need a thermometer.",
      "Dark roasts prefer the lower end of this range, around 91 to 93C.",
    ],
    relatedTool: { label: "French Press Ratio Calculator", slug: "french-press-ratio-calculator" },
  },
  diag_frenchpress_grind_coarser: {
    type: "diagnosis",
    id: "diag_frenchpress_grind_coarser",
    title: "Grind is likely too fine for French press",
    explanation: "With correct temperature and a 4-minute steep, persistent bitterness usually means the grind is too fine. French press uses full immersion, so finer grinds extract more aggressively and also pass through the metal filter into the cup.",
    fixes: [
      "Use a coarse grind: roughly the texture of coarse sea salt.",
      "If you are using a blade grinder, it produces inconsistent particle sizes that contribute to bitterness. A burr grinder solves this.",
      "Taste after grinding coarser; adjust by one setting at a time.",
    ],
    relatedTool: { label: "Grind Size Guide", slug: "grind-size-guide" },
  },
  diag_frenchpress_combo: {
    type: "diagnosis",
    id: "diag_frenchpress_combo",
    title: "Multiple variables worth adjusting",
    explanation: "When water temperature is unknown, several factors may be contributing to bitterness together: slightly too hot water, slightly too fine grind, or slightly too long steep.",
    fixes: [
      "Start with grind: move to a clearly coarse setting, coarser than what you use now.",
      "Steep for exactly 4 minutes using a timer, not a guess.",
      "Let your water cool for 45 seconds after boiling before pouring.",
      "After plunging, pour the coffee out of the press immediately to stop extraction.",
    ],
    relatedTool: { label: "French Press Timer", slug: "french-press-timer" },
  },
  diag_aeropress_short_bitter: {
    type: "diagnosis",
    id: "diag_aeropress_short_bitter",
    title: "Short steep but still bitter: check your dose",
    explanation: "Under 60 seconds is a very short steep for AeroPress. Bitterness at this point usually means the dose (amount of coffee) is too high relative to the water volume, or the grind is extremely fine.",
    fixes: [
      "Check your coffee-to-water ratio: standard AeroPress uses 15 to 17g per 200 to 240ml.",
      "If your dose is higher, reduce by 2g and taste.",
      "Alternatively, try a slightly coarser grind with the same dose and same steep time.",
    ],
    relatedTool: { label: "AeroPress Recipe Guide", slug: "aeropress-recipe" },
  },
  diag_aeropress_grind_bitter: {
    type: "diagnosis",
    id: "diag_aeropress_grind_bitter",
    title: "Grind too fine for the steep time",
    explanation: "A 1 to 2 minute steep with a fine grind often over-extracts in AeroPress. The AeroPress extracts efficiently because of pressure and immersion: it needs either less time or a coarser grind.",
    fixes: [
      "Coarsen your grind by 1 step and test.",
      "Alternatively, keep the grind and reduce steep by 20 to 30 seconds.",
      "The James Hoffmann AeroPress method uses boiling water, a medium grind, and a 2-minute wait: very consistent results.",
    ],
    relatedTool: { label: "AeroPress Brew Timer", slug: "aeropress-timer" },
  },
  diag_aeropress_long_steep: {
    type: "diagnosis",
    id: "diag_aeropress_long_steep",
    title: "Steep time too long",
    explanation: "AeroPress extracts quickly due to pressure and full immersion. Over 2 minutes of steep typically over-extracts and causes bitterness, especially with a finer grind.",
    fixes: [
      "Reduce your steep to 60 to 90 seconds for standard brewing.",
      "If you want a longer steep, coarsen your grind to compensate.",
      "Stop pressing the moment you hear a hissing sound: that is air, not coffee. Continuing past it pushes bitter compounds through.",
    ],
    relatedTool: { label: "AeroPress Brew Timer", slug: "aeropress-timer" },
  },
  diag_pourover_sour_fast: {
    type: "diagnosis",
    id: "diag_pourover_sour_fast",
    title: "Under-extraction due to fast drawdown",
    explanation: "A pour over completing in under 2 minutes is flowing too freely. Water is not spending enough time with the grounds, resulting in sour, under-extracted coffee.",
    fixes: [
      "Grind 2 to 3 steps finer: this is the primary fix for fast pour over.",
      "Target a total brew time of 3 to 3.5 minutes for V60 with a standard dose.",
      "Ensure your filter is wet before brewing: an unrinsed dry filter can be porous.",
    ],
    relatedTool: { label: "Pour Over Brew Timer", slug: "pour-over-timer" },
  },
  diag_pourover_sour_slow: {
    type: "diagnosis",
    id: "diag_pourover_sour_slow",
    title: "Slow drawdown with sour taste (channelling)",
    explanation: "A slow brew that still tastes sour usually indicates channelling: water is flowing through one path rather than evenly through the entire coffee bed, leaving most grounds under-extracted while the drip time still appears slow.",
    fixes: [
      "Stir or swirl the slurry during the bloom to ensure even saturation before pouring.",
      "Pour in a steady spiral from centre to edge: avoid pouring repeatedly in one spot.",
      "Check that your filter is fully sealed against the dripper walls with no gaps.",
    ],
    relatedTool: { label: "Coffee Bloom Timer", slug: "coffee-bloom-timer" },
  },
  diag_pourover_sour_temp: {
    type: "diagnosis",
    id: "diag_pourover_sour_temp",
    title: "Water temperature likely too low",
    explanation: "When bloom and brew time are correct but the coffee is still sour, water temperature is often the culprit. Cooler water extracts less efficiently and leaves acidic compounds dominant.",
    fixes: [
      "Brew at 93 to 95C: if you are boiling and waiting a long time, pour sooner.",
      "For light roasts, use 94 to 96C because they need more heat to fully open up.",
      "A temperature-controlled gooseneck kettle removes this variable entirely.",
    ],
    relatedTool: { label: "Pour Over Calculator", slug: "pour-over-calculator" },
  },
  diag_pourover_sour_no_bloom: {
    type: "diagnosis",
    id: "diag_pourover_sour_no_bloom",
    title: "No bloom causing uneven extraction",
    explanation: "Skipping the bloom often causes sour coffee. CO2 trapped in fresh grounds creates barriers that prevent even water distribution: some areas get under-extracted while others get bypassed entirely.",
    fixes: [
      "Add a 30 to 45 second bloom: pour twice the coffee weight in water and wait.",
      "For beans within 2 weeks of their roast date, extend bloom to 45 to 60 seconds.",
      "After the bloom, continue your pour in slow spirals from centre to edge.",
    ],
    relatedTool: { label: "Coffee Bloom Timer", slug: "coffee-bloom-timer" },
  },
  diag_frenchpress_sour_short: {
    type: "diagnosis",
    id: "diag_frenchpress_sour_short",
    title: "Steep time too short",
    explanation: "Under 3 minutes is not enough time for French press to fully extract at most grind sizes. The result is a sour, under-developed cup that lacks body and sweetness.",
    fixes: [
      "Steep for exactly 4 minutes: set a timer and do not guess.",
      "After plunging, pour immediately so the coffee does not continue extracting on the grounds.",
      "If 4 minutes is still sour, grind 1 step finer.",
    ],
    relatedTool: { label: "French Press Timer", slug: "french-press-timer" },
  },
  diag_frenchpress_sour_temp: {
    type: "diagnosis",
    id: "diag_frenchpress_sour_temp",
    title: "Water temperature too low",
    explanation: "With a correct 4-minute steep, sour French press coffee is often a water temperature problem. Water that is too cool does not extract efficiently and leaves acidic compounds dominant in the final cup.",
    fixes: [
      "Use water that is just off-boil: about 30 seconds after the kettle clicks off.",
      "Target 93 to 96C: you do not need a thermometer for this range.",
      "Pre-heat your French press by rinsing it with hot water for 30 seconds before brewing.",
    ],
    relatedTool: { label: "French Press Ratio Calculator", slug: "french-press-ratio-calculator" },
  },
  diag_frenchpress_sour_grind: {
    type: "diagnosis",
    id: "diag_frenchpress_sour_grind",
    title: "Grind may be too coarse for immersion",
    explanation: "Sour coffee with a 5-minute steep is unusual. At this steep time, the grind is likely too coarse: very coarse grinds have less surface area and extract slowly even in full immersion brewing.",
    fixes: [
      "Grind 1 to 2 steps finer, but stay coarser than a drip filter grind.",
      "If you go finer, reduce steep time back to 4 minutes.",
      "French press grind should look like coarse sand, not the fine powder of espresso.",
    ],
    relatedTool: { label: "Grind Size Guide", slug: "grind-size-guide" },
  },
  diag_aeropress_sour: {
    type: "diagnosis",
    id: "diag_aeropress_sour",
    title: "Under-extracted AeroPress",
    explanation: "Sour AeroPress coffee is under-extracted. The most common causes are a steep that is too short, a grind that is too coarse, or water that is not hot enough.",
    fixes: [
      "Add 15 to 20 seconds to your steep time and taste.",
      "Grind 1 step finer to increase surface area and extraction rate.",
      "Try boiling water at 100C: AeroPress handles high temperature well because the contact time is short.",
    ],
    relatedTool: { label: "AeroPress Brew Timer", slug: "aeropress-timer" },
  },
  diag_muddy: {
    type: "diagnosis",
    id: "diag_muddy",
    title: "Sediment or cloudiness in the cup",
    explanation: "Sediment and cloudiness are caused by fine coffee particles passing through the filter or settling in the cup. This is most common with French press, metal filters, and grinders that produce a lot of fine dust.",
    fixes: [
      "French press: use a coarser grind and plunge slowly. Let it sit for 1 minute after plunging before pouring: this lets fines settle to the bottom.",
      "Pour over with metal filter: switch to a paper filter, or grind slightly coarser.",
      "AeroPress: double-filter using two paper filters stacked, or try the Prismo attachment.",
      "Blade grinders produce many fine particles: a burr grinder gives more consistent particle sizes and far less sediment.",
    ],
    relatedTool: { label: "Grind Size Guide", slug: "grind-size-guide" },
  },
  diag_stale: {
    type: "diagnosis",
    id: "diag_stale",
    title: "Coffee may be stale or past its best",
    explanation: "Coffee that has some flavour initially but fades fast, or tastes flat with no sweetness, is often past its best. Ground coffee goes stale in 1 to 2 weeks; whole beans last 4 to 6 weeks after the roast date.",
    fixes: [
      "Check the roast date on your bag: aim to brew within 4 to 6 weeks of roasting.",
      "Store beans in an airtight container away from light and heat. Avoid the freezer for daily-use beans.",
      "If you are using pre-ground coffee, use it within 2 weeks of opening.",
      "Grinding immediately before brewing is the single biggest freshness improvement.",
    ],
    relatedTool: { label: "Coffee-to-Water Ratio Calculator", slug: "coffee-ratio-calculator" },
  },
  diag_weak_ratio: {
    type: "diagnosis",
    id: "diag_weak_ratio",
    title: "Not enough coffee for the volume of water",
    explanation: "Using under 6g of coffee per 250ml cup is well below the standard ratio and will produce thin, weak coffee regardless of grind or temperature.",
    fixes: [
      "The standard ratio is 60g of coffee per litre of water: that is 6g per 100ml, or about 1 heaped tablespoon per 100ml.",
      "For a standard 250ml cup, use 15g of coffee as a starting point.",
      "Use a scale: tablespoon measurements vary widely depending on how coarse your grind is.",
    ],
    relatedTool: { label: "Coffee-to-Water Ratio Calculator", slug: "coffee-ratio-calculator" },
  },
  diag_weak_drip: {
    type: "diagnosis",
    id: "diag_weak_drip",
    title: "Drip machine is under-dosed",
    explanation: "Drip machines often suggest using less coffee than the golden ratio calls for. For a 12-cup pot (roughly 1.8 litres), you need around 100g of coffee for a full-flavoured result.",
    fixes: [
      "Use 60g of coffee per litre of water as your base. Scale up or down from there.",
      "Most drip machine scoops are 10 to 12g: use 6 scoops for a full 12-cup pot.",
      "If the coffee still tastes weak after increasing dose, grind slightly finer.",
    ],
    relatedTool: { label: "Coffee-to-Water Ratio Calculator", slug: "coffee-ratio-calculator" },
  },
  diag_weak_pourover_ratio: {
    type: "diagnosis",
    id: "diag_weak_pourover_ratio",
    title: "Pour over dose is too low",
    explanation: "For V60 and Chemex, the standard starting point is 15 to 20g of coffee per 250 to 300ml of water. Using 6 to 8g produces a noticeably weak cup regardless of technique.",
    fixes: [
      "Try 20g of coffee for 300ml of water (1:15 ratio) as a starting point.",
      "If 1:15 is too strong, pull back to 1:16 or 1:17, but start high rather than low.",
      "Use a kitchen scale: it is more consistent than tablespoons for pour over dialing.",
    ],
    relatedTool: { label: "Pour Over Calculator", slug: "pour-over-calculator" },
  },
  diag_weak_fp_ratio: {
    type: "diagnosis",
    id: "diag_weak_fp_ratio",
    title: "French press or AeroPress dose is too low",
    explanation: "Both French press and AeroPress produce fuller-bodied coffee than drip, but they still require the right dose. Under 12g for a 200ml serve will taste weak.",
    fixes: [
      "French press: aim for 1:15 (33g for 500ml).",
      "AeroPress: start with 15 to 17g for 200 to 240ml of water.",
      "If you prefer a lighter style, extend steep time slightly rather than reducing dose further.",
    ],
    relatedTool: { label: "French Press Ratio Calculator", slug: "french-press-ratio-calculator" },
  },
  diag_weak_coarse: {
    type: "diagnosis",
    id: "diag_weak_coarse",
    title: "Grind may be too coarse for the method",
    explanation: "If you are using more than 2 tablespoons per cup and the coffee is still thin, the grind is extracting less than it should: likely too coarse for the method or steep time.",
    fixes: [
      "Grind 1 to 2 steps finer and taste.",
      "Match your grind to your method: espresso needs fine, pour over needs medium-fine, French press needs coarse.",
      "Check your grinder: some grinders drift coarser over time as burrs wear down.",
    ],
    relatedTool: { label: "Grind Size Guide", slug: "grind-size-guide" },
  },
  diag_weak_temp_pourover: {
    type: "diagnosis",
    id: "diag_weak_temp_pourover",
    title: "Flat pour over: temperature or grind",
    explanation: "Flat, flavourless pour over despite correct dose usually points to low water temperature or a grind that is too coarse for the target brew time.",
    fixes: [
      "Brew at 92 to 96C: if you let your kettle cool for more than 2 minutes, pour sooner.",
      "If the brew drains in under 2.5 minutes, grind finer to increase contact time.",
      "Bloom for 45 seconds with fresh beans: insufficient bloom leaves CO2 blocking even water distribution.",
    ],
    relatedTool: { label: "Pour Over Brew Timer", slug: "pour-over-timer" },
  },
  diag_weak_drip_descale: {
    type: "diagnosis",
    id: "diag_weak_drip_descale",
    title: "Drip machine may need descaling",
    explanation: "Drip machines that have not been descaled in months produce cooler water, which extracts less efficiently. Scale buildup insulates the heating element and reduces water temperature below the optimal range.",
    fixes: [
      "Descale your machine every 1 to 3 months using a commercial descaler or a diluted white vinegar solution.",
      "Run two rinse cycles with plain water after descaling to flush thoroughly.",
      "After descaling, also increase your dose by 1 tablespoon to see if flavour improves.",
    ],
    relatedTool: { label: "Coffee-to-Water Ratio Calculator", slug: "coffee-ratio-calculator" },
  },
  diag_weak_fp_temp: {
    type: "diagnosis",
    id: "diag_weak_fp_temp",
    title: "French press flat despite correct dose",
    explanation: "Flat French press coffee with the right amount of coffee is usually a temperature or bean freshness issue. Water that is too cool extracts slowly and incompletely in a 4-minute steep.",
    fixes: [
      "Use water just off-boil: 93 to 96C is ideal.",
      "Check your beans: coffee roasted more than 6 weeks ago loses complexity rapidly.",
      "Pre-heat the French press by filling it with hot water for 30 seconds before brewing.",
    ],
    relatedTool: { label: "French Press Timer", slug: "french-press-timer" },
  },
  diag_aeropress_weak: {
    type: "diagnosis",
    id: "diag_aeropress_weak",
    title: "AeroPress weak or thin",
    explanation: "Weak AeroPress coffee is usually a dose or ratio problem. AeroPress works best with a relatively high dose compared to the water volume.",
    fixes: [
      "Standard starting point: 15 to 17g of coffee for 200 to 240ml of water.",
      "If your dose is in range, steep for 15 to 20 seconds longer before pressing.",
      "Grind slightly finer: AeroPress tolerates finer grinds well due to its short steep time.",
    ],
    relatedTool: { label: "AeroPress Recipe Guide", slug: "aeropress-recipe" },
  },
  diag_strong_dose: {
    type: "diagnosis",
    id: "diag_strong_dose",
    title: "Reduce your coffee dose",
    explanation: "The most direct way to reduce strength is to use less coffee without changing anything else. This preserves your grind and technique while lowering the concentration of the brew.",
    fixes: [
      "Reduce your dose by 2g and taste before adjusting further.",
      "If you are at a 1:15 ratio, try 1:16 or 1:17: more water per gram of coffee.",
      "Using a scale gives you precise control: tablespoon measurements vary too much for fine adjustments.",
    ],
    relatedTool: { label: "Coffee-to-Water Ratio Calculator", slug: "coffee-ratio-calculator" },
  },
  diag_strong_grind: {
    type: "diagnosis",
    id: "diag_strong_grind",
    title: "Coarser grind reduces extraction and intensity",
    explanation: "A coarser grind has less surface area and extracts fewer compounds in the same time, producing a lighter body and reduced intensity without requiring a different dose.",
    fixes: [
      "Move your grind 1 to 2 steps coarser.",
      "Check that brew time stays within the target range: too coarse may cause under-extraction and sourness.",
      "This approach works best when you like the volume of the cup but find it too concentrated or heavy.",
    ],
    relatedTool: { label: "Grind Size Guide", slug: "grind-size-guide" },
  },
  diag_strong_time: {
    type: "diagnosis",
    id: "diag_strong_time",
    title: "Reduce steep or brew time",
    explanation: "Reducing the time water contacts coffee is an effective way to reduce strength for immersion methods. For pour over, the grind controls time more directly than technique adjustments.",
    fixes: [
      "French press: reduce steep from 4 minutes to 3.5 minutes and taste.",
      "AeroPress: reduce steep by 20 to 30 seconds before pressing.",
      "For pour over, grind slightly coarser rather than pouring faster: faster pouring can cause channelling.",
    ],
    relatedTool: { label: "French Press Timer", slug: "french-press-timer" },
  },
  diag_strong_roast: {
    type: "diagnosis",
    id: "diag_strong_roast",
    title: "Dark roast requires a small dose reduction",
    explanation: "Dark roasts are more soluble than light roasts and extract more intensely at the same dose and grind. Switching to a darker bag often means needing slightly less coffee.",
    fixes: [
      "Reduce your dose by 2 to 3g and keep everything else the same.",
      "Dark roasts can also taste more bitter at higher temperatures: try brewing at 88 to 91C.",
      "If the strength is fine but it is too bitter, the issue is over-extraction rather than dose.",
    ],
    relatedTool: { label: "Coffee-to-Water Ratio Calculator", slug: "coffee-ratio-calculator" },
  },
  diag_strong_grind_change: {
    type: "diagnosis",
    id: "diag_strong_grind_change",
    title: "Grind became finer after changing grinder",
    explanation: "Different grinders produce different particle sizes at the same setting number. A setting that was medium on one grinder may be fine on another, causing stronger, more concentrated extraction.",
    fixes: [
      "Start at a coarser setting than you think you need, then dial in from there.",
      "Coarsen by 2 settings and pull a test batch.",
      "Check brew time: if it is slower than before, the grind is definitely finer.",
    ],
    relatedTool: { label: "Grind Size Guide", slug: "grind-size-guide" },
  },
  diag_strong_dose_change: {
    type: "diagnosis",
    id: "diag_strong_dose_change",
    title: "Dose is now too high",
    explanation: "Increasing dose without proportionally increasing water volume produces a stronger, more concentrated cup. The fix is to reduce dose or increase water to match at your target ratio.",
    fixes: [
      "Return to your previous dose, or increase water to match the new dose at your preferred ratio.",
      "The standard ratio is 60g of coffee per litre of water: use this as your calibration point.",
      "Weigh your coffee: even a 2g difference per cup noticeably affects flavour intensity.",
    ],
    relatedTool: { label: "Coffee-to-Water Ratio Calculator", slug: "coffee-ratio-calculator" },
  },
}

function CopyDiagnosis({ node }: { node: DiagnosisNode }) {
  const [copied, setCopied] = useState(false)
  const text = [
    `Coffee Troubleshooter: ${node.title}`,
    "",
    node.explanation,
    "",
    "What to try:",
    ...node.fixes.map((f, i) => `${i + 1}. ${f}`),
  ].join("\n")
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }, [text])
  return (
    <button onClick={copy}
      className="min-h-[44px] w-full rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-surface-600 transition-all hover:bg-surface-100 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700">
      {copied ? "Copied to clipboard!" : "Copy this diagnosis"}
    </button>
  )
}

export function CoffeeTroubleshooter() {
  const [history, setHistory] = useState<NodeId[]>(["start"])

  const currentId = history[history.length - 1]
  const current   = NODES[currentId]

  function select(nextId: NodeId) { setHistory(prev => [...prev, nextId]) }
  function back()  { setHistory(prev => prev.slice(0, -1)) }
  function reset() { setHistory(["start"]) }

  if (!current) return null

  const questionDepth = history.filter(id => NODES[id]?.type === "question").length

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-700 px-5 py-3 sm:px-6">
        <div>
          {history.length > 1 ? (
            <button onClick={back}
              className="text-sm text-surface-500 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors">
              Back
            </button>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">
              Coffee Troubleshooter
            </span>
          )}
        </div>
        {history.length > 1 && (
          <button onClick={reset}
            className="text-xs text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors">
            Start over
          </button>
        )}
      </div>

      {questionDepth > 1 && (
        <div className="px-5 pt-3 sm:px-6 flex gap-1.5">
          {Array.from({ length: questionDepth - 1 }).map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-brand-400 dark:bg-brand-600" />
          ))}
          <div className="h-1 flex-1 rounded-full bg-surface-200 dark:bg-surface-700" />
        </div>
      )}

      <div className="p-5 sm:p-6">
        {current.type === "question" ? (
          <div className="space-y-4">
            <p className="text-base font-semibold text-surface-800 dark:text-surface-100">
              {current.question}
            </p>
            <div className="flex flex-col gap-2">
              {current.options.map((opt) => (
                <button
                  key={opt.nextId}
                  onClick={() => select(opt.nextId)}
                  className="min-h-[44px] w-full rounded-xl border border-surface-200 bg-white px-4 py-3 text-left text-sm text-surface-700 transition-all hover:border-brand-400 hover:bg-brand-50 hover:text-surface-900 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500 dark:hover:bg-surface-700"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 dark:border-green-800 dark:bg-green-950">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400 mb-1">Diagnosis</p>
              <p className="font-semibold text-surface-800 dark:text-surface-100">{current.title}</p>
            </div>

            <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
              {current.explanation}
            </p>

            <div>
              <p className="text-sm font-semibold text-surface-700 dark:text-surface-200 mb-3">What to try:</p>
              <ul className="space-y-2.5">
                {current.fixes.map((fix, i) => (
                  <li key={i} className="flex gap-3 text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                      {i + 1}
                    </span>
                    <span>{fix}</span>
                  </li>
                ))}
              </ul>
            </div>

            {current.relatedTool && (
              <div className="pt-1 border-t border-surface-100 dark:border-surface-700">
                <Link
                  href={`/${current.relatedTool.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
                >
                  Try the {current.relatedTool.label} →
                </Link>
              </div>
            )}

            <CopyDiagnosis node={current} />

            <button
              onClick={reset}
              className="w-full min-h-[44px] rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-surface-600 transition-all hover:bg-surface-100 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
            >
              Diagnose a different problem
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
