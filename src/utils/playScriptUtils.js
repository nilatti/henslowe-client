import _ from 'lodash'
import Syllable from 'syllable'

function calculateLineCount(lines) { //array of lines
  lines.map((line) => {
    line.count = 1
    let syllablesPerLine
    let defaultSyllables = 10
    let count = 0
    if (line.new_content && line.new_content.match(/[a-zA-Z]+/)) {
      syllablesPerLine = Syllable(line.new_content)
    } else if (line.new_content && line.new_content.match(/^\s$/)) {
      syllablesPerLine = 0
    } else {
      syllablesPerLine = Syllable(line.original_content)
    }
    line.count = calculateChange(syllablesPerLine, defaultSyllables)
  })
  return _.sumBy(lines, 'count').toFixed(2)
}

function calculateRunTime(lines, linesPerMinute) { //exects lines per minute as int and lines as array
  return  calculateLineCount(lines)/ linesPerMinute
}

function calculateChange(a, b){
  return a/b
}

function getFrenchScenesFromAct(act) {
  let frenchScenes = []
  act.scenes.map((scene) => {
    frenchScenes.push(scene.french_scenes)
  })
  let flattened = _.flattenDeep(frenchScenes)
  return _.compact(flattened)
}

function getFrenchScenesFromPlay(play) {
  let frenchScenes = []
  play.acts.map((act) => {
    frenchScenes.push(getFrenchScenesFromAct(act))
  })
  let flattened = _.flattenDeep(frenchScenes)
  return _.compact(flattened)
}

function getScenesFromPlay(play) {
  let scenes = []
  play.acts.map((act) => scenes.push(act.scenes))
  let flattened = _.flattenDeep(scenes)
  return _.compact(flattened)
}

function getLinesFromCharacters(characters) {
  let lines = []
  characters.map((character) => {
    if (character.lines) {
      lines.push(character.lines)
    }
  })
  return _.flattenDeep(lines)
}

function getOnStagesFromAct(act) {
  let onStages = []
  let frenchScenes = getFrenchScenesFromAct(act)
  frenchScenes.map((frenchScene) => {
    onStages.push(frenchScene.on_stages)
  })
  let flat = _.flattenDeep(onStages)
  let compact = _.compact(flat)
  return _.uniqBy(compact, 'character_id')
}

function getOnStagesFromScene(scene) {
  let onStages = []
  let frenchScenes = scene.french_scenes
  frenchScenes.map((frenchScene) => {
    onStages.push(frenchScene.on_stages)
  })
  let flat = _.flattenDeep(onStages)
  return _.uniqBy(flat, 'character_id')
}

function letterValue(str){
    var anum={
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11,
        l: 12, m: 13, n: 14,o: 15, p: 16, q: 17, r: 18, s: 19, t: 20,
        u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
    }
    if(str.length== 1) return anum[str] || ' ';
    return str.split('').map(letterValue);
}

function mergeTextFromFrenchScenes(frenchScenes) {
    let allText = {
      lines: [],
      sound_cues: [],
      stage_directions: [],
    }
    frenchScenes.map((frenchScene) =>
      {
        let gatheredLines = frenchScene.lines
        let compactLines = _.compact(gatheredLines)
        allText.lines = allText.lines.concat(compactLines)
        let compactStageDirections = _.compact(frenchScene.stage_directions)
        allText.stage_directions = allText.stage_directions.concat(compactStageDirections)
        let compactSoundCues = _.compact(frenchScene.sound_cues)
        allText.sound_cues = allText.sound_cues.concat(compactSoundCues)
      }
    )
    return allText
}

function sortLines(arrayOfLines) {
  let brokenOut = arrayOfLines.map((line) => {
    let line_number
    let act_number
    let scene_number
    if (line.number) {
      if (line.number.match(/EPI/)) {
        let number = line.number.replace('SD ', '')
        let number_pieces = number.split('.')
        act_number = 6
        scene_number = 1
        line_number = parseFloat(number_pieces[1])
      } else {
        let number = line.number.replace('SD ', '')
        let number_pieces = number.split('.')
        act_number = parseFloat(number_pieces[0])
        scene_number = parseFloat(number_pieces[1])
        if (number_pieces[2].match(/[a-zA-z]/)) {
          let letter = number_pieces[2].match(/[a-z]/)
          let numString = number_pieces[2].match(/[^a-z]/) + "." + letter
          line_number = parseFloat(numString)
        } else {
          line_number = parseFloat(number_pieces[2])
        }
        if (typeof scene_number === 'undefined') {
          console.log('undefined scene number', line)
        }
      }
    } else {
      console.log('line does not have number', line)
    }
    return {
      act_number: act_number,
      line: line,
      line_number: line_number,
      scene_number: scene_number
    }
  })
  let sorted = _.sortBy(brokenOut, 'act_number', 'scene_number', 'line_number')
  return sorted.map((item) => item.line)
}

export {
  calculateChange,
  calculateLineCount,
  calculateRunTime,
  getFrenchScenesFromAct,
  getFrenchScenesFromPlay,
  getLinesFromCharacters,
  getOnStagesFromAct,
  getOnStagesFromScene,
  getScenesFromPlay,
  mergeTextFromFrenchScenes,
  sortLines
}
