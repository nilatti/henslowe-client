import chai from 'chai';

import {
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
} from '../utils/playScriptUtils'

let play = {
  id: 1,
  title: 'this is the title',
  acts: [
    {
      id: 1,
      number: 1,
      scenes: [
        {
          id: 1,
          number: 1,
          french_scenes: [
            {
              id: 1,
              number: 'a',
              on_stages: [
                {
                  id: 1,
                  character_id: 1
                },
                {
                  id: 2,
                  character_id: 2
                }
              ],
              lines: [
                {
                  id: 1,
                  character_id: 1,
                  number: '1.1.1',
                  original_content: 'Escalus.',
                  new_content: ''
                },
                {
                  id: 2,
                  character_id: 2,
                  number: '1.1.2',
                  original_content: 'My lord.',
                  new_content: ''
                },
                {
                  id: 3,
                  character_id: 1,
                  number: '1.1.3',
                  original_content: 'Of government the properties to unfold',
                  new_content: ''
                },
                {
                  id: 4,
                  character_id: 1,
                  number: '1.1.4',
                  original_content: 'Would seem in me t’ affect speech and discourse,',
                  new_content: ''
                },
                {
                  id: 5,
                  character_id: 1,
                  number: '1.1.5',
                  original_content: 'Since I am put to know that your own science',
                  new_content: ''
                },
                {
                  id: 6,
                  character_id: 1,
                  number: '1.1.6',
                  original_content: 'Exceeds, in that, the lists of all advice',
                  new_content: ''
                },
                {
                  id: 7,
                  character_id: 1,
                  number: '1.1.7',
                  original_content: 'My strength can give you. Then no more remains',
                  new_content: ''
                },
                {
                  id: 8,
                  character_id: 1,
                  number: '1.1.8',
                  original_content: 'But that, to your sufficiency, as your worth is able,',
                  new_content: ''
                },
                {
                  id: 9,
                  character_id: 1,
                  number: '1.1.9',
                  original_content: 'And let them work. The nature of our people,',
                  new_content: ''
                },
                {
                  id: 10,
                  character_id: 1,
                  number: '1.1.10',
                  original_content: 'Our city’s institutions, and the terms',
                  new_content: ''
                },
              ],
              stage_directions: [
                {
                  id: 1,
                  character_id: 1,
                  number: 'SD 1.1.0',
                  original_content: 'Enter Duke, Escalus, Lords, and Attendants.'
                },
                {
                  id: 2,
                  character_id: 2,
                  number: 'SD 1.1.0',
                  original_content: 'Enter Duke, Escalus, Lords, and Attendants.'
                }
              ]

            },
            {
              id: 2,
              number: 'b',
              lines: [
                {
                  id: 11,
                  character_id: 1,
                  number: '1.1.11',
                  original_content: 'For common justice, you’re as pregnant in'
                },
                {
                  id: 12,
                  character_id: 1,
                  number: '1.1.12',
                  original_content: 'As art and practice hath enrichèd any'
                },
                {
                  id: 13,
                  character_id: 1,
                  number: '1.1.13',
                  original_content: 'That we remember. There is our commission,'
                },
                {
                  id: 14,
                  character_id: 1,
                  number: '1.1.14',
                  original_content: 'From which we would not have you warp.—Call'
                },
                {
                  id: 15,
                  character_id: 1,
                  number: '1.1.15',
                  original_content: 'hither'
                },
                {
                  id: 16,
                  character_id: 1,
                  number: '1.1.16',
                  original_content: 'I say, bid come before us Angelo.'
                },
                {
                  id: 17,
                  character_id: 1,
                  number: '1.1.17',
                  original_content: 'What figure of us think you he will bear?'
                },

              ],
              stage_directions: [
                {
                  id: 3,
                  character_id: 1,
                  number: 'SD 1.1.13.1',
                  original_content: 'He hands Escalus a paper.'
                },
                {
                  id: 4,
                  character_id: 3,
                  number: 'SD 1.1.16.1',
                  original_content: 'An Attendant exits.'
                }
              ],
              on_stages: [
                {
                  id: 3,
                  character_id: 1
                },
                {
                  id: 4,
                  character_id: 3
                },
                {
                  id: 5,
                  character_id: 4
                }
              ]
            }
          ]
        },
        {
          id: 2,
          number: 2,
          french_scenes: [
            {
              id: 3,
              number: 'a',
              on_stages: [{
                id: 6,
                character_id: 3,
              },
              {
                id: 7,
                character_id: 1
              }
            ]
            },
            {
              id: 4,
              number: 'b'
            },
            {
              id: 5,
              number: 'c',
              on_stages:[
                {
                  id: 8,
                  character_id: 4
                }
              ]
            }
          ]
        },
        {
          id: 3,
          number: 3,
        },
        {
          id: 4,
          number: 4,
        },
      ]
    },
    {
      id: 2,
      number: 2,
      scenes: [
        {
          id: 5,
          number: 1,
          french_scenes: [
            {
              id: 6,
              number: 'a',
              lines: [
                {
                  id: 18,
                  character_id: 4,
                  number: '2.1.1',
                  original_content: 'We must not make a scarecrow of the law,'
                },
                {
                  id: 19,
                  character_id: 4,
                  number: '2.1.2',
                  original_content: 'Setting it up to fear the birds of prey,'
                },
              ],
              stage_directions: [
                {
                  id: 5,
                  number: 'SD 2.1.3',
                  original_content: 'Enter Angelo, Escalus, Servants, and a Justice.'
                }
              ]
            },
            {
              id: 7,
              number: 'b'
            }
          ]
        },
        {
          id: 6,
          number: 2,
          french_scenes: [
            {
              id: 8,
              number: 'a',
            },
            {
              id: 9,
              number: 'b'
            },
            {
              id: 10,
              number: 'c'
            }
          ]
        },
        {
          id: 7,
          number: 3,
        },
        {
          id: 8,
          number: 4,
        },
      ]
    }
  ],
  characters: [
    {
      id: 1,
      name: 'Bill',
      lines: [
        {
          id: 1,
          original_content: 'Shall I compare thee to a summer\'s day?'
        },
        {
          id: 2,
          original_content: 'Thou art more lovely and more temperate.'
        },
        {
          id: 3,
          original_content: 'Rough winds to shake the darling buds of May'
        },
        {
          id: 4,
          original_content: 'And summer\'s lease hath all to short a date'
        }
      ]
    },
    {
      id: 2,
      name: 'Judy',
      lines: [
        {
          id: 5,
          original_content: 'When in disgrace with fortune and men\'s eyes'
        },
        {
          id: 6,
          original_content: 'I all alone beweep my outcast state'
        },
        {
          id: 7,
          original_content: 'And trouble deaf heaven with my bootless cries'
        },
        {
          id: 8,
          original_content: 'And look upon myself and curse my fate'
        }
      ]
    },
    {
      id: 3,
      name: 'Third Guard',
      lines: []
    }
  ]
}

let regular_lines = [ //20 lines, each with 10 syllables, no new content
  {id: 1, original_content: 'Who will believe my verse in time to come', new_content: ''},
  {id: 2, original_content: 'If it were filled with your most high deserts', new_content: ''},
  {id: 3, original_content: 'Though yet heaven knows it is but as a ', new_content: ''},
  {id: 4, original_content: 'Which hides your life and shows not half your parts', new_content: ''},
  {id: 5, original_content: 'If I could write the beauty of your eyes', new_content: ''},
  {id: 6, original_content: 'And in fresh numbers, number all your grace', new_content: ''},
  {id: 7, original_content: 'The age to come would say this poet lies', new_content: ''},
  {id: 8, original_content: 'Such heavenly touches ne\'er touched earthly', new_content: ''},
  {id: 9, original_content: 'So should my papers, yellowed with their age', new_content: ''},
  {id: 10, original_content: 'Be scorned like old men of less truth than tongue', new_content: ''},
  {id: 11, original_content: 'And your true rights be termed a poet\'s rage', new_content: ''},
  {id: 12, original_content: 'And stretch ed meter of an antique song', new_content: ''},
  {id: 13, original_content: 'But were some child of yours alive that time', new_content: ''},
  {id: 14, original_content: 'You should live twice, in it and in my rhyme', new_content: ''},
  {id: 15, original_content: 'To be or not to be that is the quest', new_content: ''},
  {id: 16, original_content: 'I left no ring with her, what means this lad?', new_content: ''},
  {id: 17, original_content: 'All the world\'s a stage and all the men and', new_content: ''},
  {id: 18, original_content: 'Now, fair Hippolyta, our nuptial hour', new_content: ''},
  {id: 19, original_content: 'There is a time in the affairs of men', new_content: ''},
  {id: 20, original_content: 'The slings and arrows of outrageous fort', new_content: ''},
]
let half_lines = [ //20 lines, each with half the expected number of syllables
  {id: 1, original_content: 'Who will believe my', new_content: ''},
  {id: 2, original_content: 'If it were filled with', new_content: ''},
  {id: 3, original_content: 'Though yet heaven knows', new_content: ''},
  {id: 4, original_content: 'Which hides your life and', new_content: ''},
  {id: 5, original_content: 'If I could write the', new_content: ''},
  {id: 6, original_content: 'And in fresh numbers', new_content: ''},
  {id: 7, original_content: 'The age to come would', new_content: ''},
  {id: 8, original_content: 'Such heavenly touch', new_content: ''},
  {id: 9, original_content: 'So should my papers', new_content: ''},
  {id: 10, original_content: 'Be scorned like old men', new_content: ''},
  {id: 11, original_content: 'And your true rights be', new_content: ''},
  {id: 12, original_content: 'And stretch ed meter', new_content: ''},
  {id: 13, original_content: 'But were some child of', new_content: ''},
  {id: 14, original_content: 'You should live twice, in', new_content: ''},
  {id: 15, original_content: 'To be or not to', new_content: ''},
  {id: 16, original_content: 'I left no ring with', new_content: ''},
  {id: 17, original_content: 'All the world\'s a stage', new_content: ''},
  {id: 18, original_content: 'Now, fair Hippo our', new_content: ''},
  {id: 19, original_content: 'There is a time in', new_content: ''},
  {id: 20, original_content: 'The slings and arrows', new_content: ''},
]
let double_lines = [ //20 lines, each with 20 syllables, no new content
  {id: 1, original_content: 'Who will believe my verse in time to come Who will believe my verse in time to come', new_content: ''},
  {id: 2, original_content: 'If it were filled with your most high deserts If it were filled with your most high deserts', new_content: ''},
  {id: 3, original_content: 'Though yet heaven knows it is but as a Though yet heaven knows it is but as a', new_content: ''},
  {id: 4, original_content: 'Which hides your life and shows not half your parts Which hides your life and shows not half your parts', new_content: ''},
  {id: 5, original_content: 'If I could write the beauty of your eyes If I could write the beauty of your eyes', new_content: ''},
  {id: 6, original_content: 'And in fresh numbers, number all your grace And in fresh numbers, number all your grace', new_content: ''},
  {id: 7, original_content: 'The age to come would say this poet lies The age to come would say this poet lies', new_content: ''},
  {id: 8, original_content: 'Such heavenly touches ne\'er touched earthly Such heavenly touches ne\'er touched earthly', new_content: ''},
  {id: 9, original_content: 'So should my papers, yellowed with their age So should my papers, yellowed with their age', new_content: ''},
  {id: 10, original_content: 'Be scorned like old men of less truth than tongue Be scorned like old men of less truth than tongue', new_content: ''},
  {id: 11, original_content: 'And your true rights be termed a poet\'s rage And your true rights be termed a poet\'s rage', new_content: ''},
  {id: 12, original_content: 'And stretch ed meter of an antique song And stretch ed meter of an antique song', new_content: ''},
  {id: 13, original_content: 'But were some child of yours alive that time But were some child of yours alive that time', new_content: ''},
  {id: 14, original_content: 'You should live twice, in it and in my rhyme You should live twice, in it and in my rhyme', new_content: ''},
  {id: 15, original_content: 'To be or not to be that is the quest To be or not to be that is the quest', new_content: ''},
  {id: 16, original_content: 'I left no ring with her, what means this lad? I left no ring with her, what means this lad?', new_content: ''},
  {id: 17, original_content: 'All the world\'s a stage and all the men and All the world\'s a stage and all the men and', new_content: ''},
  {id: 18, original_content: 'Now, fair Hippolyta, our nuptial hour Now, fair Hippolyta, our nuptial hour', new_content: ''},
  {id: 19, original_content: 'There is a time in the affairs of men There is a time in the affairs of men', new_content: ''},
  {id: 20, original_content: 'The slings and arrows of outrageous fort The slings and arrows of outrageous fort', new_content: ''},
]
let new_content_lines = [ //20 lines, each with 10 syllables, and new content which cuts 5 in half and doubles 10
  {id: 1, original_content: 'Who will believe my verse in time to come', new_content: 'Who will believe my'},
  {id: 2, original_content: 'If it were filled with your most high deserts', new_content: 'If it were filled with'},
  {id: 3, original_content: 'Though yet heaven knows it is but as a ', new_content: 'Though yet heaven knows'},
  {id: 4, original_content: 'Which hides your life and shows not half your parts', new_content: 'Which hides your life and'},
  {id: 5, original_content: 'If I could write the beauty of your eyes', new_content: 'If I could write the'},
  {id: 6, original_content: 'And in fresh numbers, number all your grace', new_content: 'And in fresh numbers, number all your grace And in fresh numbers, number all your grace'},
  {id: 7, original_content: 'The age to come would say this poet lies', new_content: 'The age to come would say this poet lies The age to come would say this poet lies'},
  {id: 8, original_content: 'Such heavenly touches ne\'er touched earthly', new_content: 'Such heavenly touches ne\'er touched earthly Such heavenly touches ne\'er touched earthly'},
  {id: 9, original_content: 'So should my papers, yellowed with their age', new_content: 'So should my papers, yellowed with their age So should my papers, yellowed with their age'},
  {id: 10, original_content: 'Be scorned like old men of less truth than tongue', new_content: 'Be scorned like old men of less truth than tongue Be scorned like old men of less truth than tongue'},
  {id: 11, original_content: 'And your true rights be termed a poet\'s rage', new_content: 'And your true rights be termed a poet\'s rage And your true rights be termed a poet\'s rage'},
  {id: 12, original_content: 'And stretch ed meter of an antique song', new_content: 'And stretch ed meter of an antique song And stretch ed meter of an antique song'},
  {id: 13, original_content: 'But were some child of yours alive that time', new_content: 'But were some child of yours alive that time But were some child of yours alive that time'},
  {id: 14, original_content: 'You should live twice, in it and in my rhyme', new_content: ' You should live twice, in it and in my rhyme You should live twice, in it and in my rhyme'},
  {id: 15, original_content: 'To be or not to be that is the quest', new_content: 'To be or not to be that is the quest To be or not to be that is the quest'},
  {id: 16, original_content: 'I left no ring with her, what means this lad?', new_content: ''},
  {id: 17, original_content: 'All the world\'s a stage and all the men and', new_content: ''},
  {id: 18, original_content: 'Now, fair Hippolyta, our nuptial hour', new_content: ''},
  {id: 19, original_content: 'There is a time in the affairs of men', new_content: ''},
  {id: 20, original_content: 'The slings and arrows of outrageous fort', new_content: ''},
]


describe('playScriptUtils', function() {
  describe('#calculateChange()', function() {
    it('should calculate change from longer line to shorter', function() {
      chai.assert.equal(calculateChange(5, 10), 0.5)
    })
    it('should calculate change from shorter line to longer', function() {
      chai.assert.equal(calculateChange(20, 10), 2)
    })
    it('should calculate change from when lines are the same length', function() {
      chai.assert.equal(calculateChange(10, 10), 1)
    })
  });
  describe('#calculateLineCount()', function() {
    it('should return an accurate line count', function () {
      chai.assert.equal(calculateLineCount(regular_lines), 20)
      chai.assert.equal(calculateLineCount(half_lines), 10)
      chai.assert.equal(calculateLineCount(double_lines), 40)
      chai.assert.equal(calculateLineCount(new_content_lines), 27.5)
    })
  })
  describe('#calculateRunTime()', function() {
    it('should calculate run time correctly', function() {
      let regular_lines_per_minute = 20
      let slow_lines_per_minute = 10
      chai.assert.equal(calculateRunTime(regular_lines, regular_lines_per_minute), 1)
      chai.assert.equal(calculateRunTime(regular_lines, slow_lines_per_minute), 2)
    })
  })
  describe('#getFrenchScenesFromAct()', function() {
    it('should extract french scenes from act', function() {
      chai.assert.equal(getFrenchScenesFromAct(play.acts[0]).length, 5)
      chai.assert.equal(getFrenchScenesFromAct(play.acts[0])[0].number, 'a')
    })
  })
  describe('#getFrenchScenesFromPlay()', function (){
    it('returns the french scenes from the play object', function() {
      chai.assert.equal(getFrenchScenesFromPlay(play).length, 10)
    })
  })
  describe('#getLinesFromCharacters()', function() {
    it('returns the correct lines for an array of characters', function() {
      chai.assert.equal(getLinesFromCharacters(play.characters).length, 8)
    })
  })
  describe('#getOnStagesFromAct()', function() {
    it('returns the on_stages for an act', function() {
      chai.assert.equal(getOnStagesFromAct(play.acts[0]).length, 4) //there are 6 on stages, but the function reduces to one per character id
    })
  })
  describe('#getOnStagesFromScene()', function() {
    chai.assert.equal(getOnStagesFromScene(play.acts[0].scenes[0]).length, 4)
  })
  describe('#getScenesFromPlay()', function() {
    it('returns the scenes from the play object', function() {
      chai.assert.equal(getScenesFromPlay(play).length, 8)
    })
  })
  describe('#mergeTextFromFrenchScenes()', function(){
    it('returns all the lines and stage directions from a set of french scenes', function() {
      let frenchScenes = getFrenchScenesFromPlay(play)
      chai.assert.equal(mergeTextFromFrenchScenes(frenchScenes).lines.length, 19)
      chai.assert.equal(mergeTextFromFrenchScenes(frenchScenes).stage_directions.length, 5)
    })
  })

  describe('#sortLines()', function(){
    it('returns lines in the right order by act, scene, and line number', function() {
      let frenchScenes = getFrenchScenesFromPlay(play)
      let lines = mergeTextFromFrenchScenes(frenchScenes).lines
      lines = lines.concat(mergeTextFromFrenchScenes(frenchScenes).stage_directions)
      let sortedLines = sortLines(lines)
      chai.assert.equal(sortedLines[0].id, '1')
      chai.assert.equal(sortedLines[15].number, 'SD 1.1.13.1')
    })
  })
});
