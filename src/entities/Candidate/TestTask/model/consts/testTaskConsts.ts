import {TaskSetPack} from '../types/testTask'
import {ProgrammingLanguage} from 'core/enums'

export const testTaskDataExample: TaskSetPack = {
  id: 1,
  name: 'Java',
  timeLimits: 10800,
  description: '',
  numOfTry: 1,
  data: [
    {
      description: 'Cool Task',
      timeLimits: 7200,
      name: 'Java padavan',
      id: 1,
      creator: 'p',
      timeOfCreation: 1233,
      language: [ProgrammingLanguage.JavaScript],
      testTasks: [
        {
          name: 'Тест на знание JS',
          id: 3,
          execTime: 600,
          description: 'blalbal',
          questions: [
            {
              id: 1,
              description: 'Какие существуют типы данных в JavaScript?',
              points: 1,
              wrongAnswers: ['Boolean', 'String', 'Number'],
              correctAnswers: ['Function', 'Class'],
            },
            {
              id: 2,
              points: 1,
              description: 'Какие существуют типы данных в Java?',
              correctAnswers: ['byte', 'short', 'int'],
              wrongAnswers: ['char', 'boolean'],
            },
            {
              id: 3,
              points: 1,
              description: 'Как называется код между фигурными скобками?',
              correctAnswers: ['функция', 'секция', 'тело', 'блок'],
              wrongAnswers: ['function', 'int'],
            },
            {
              id: 4,
              points: 1,
              description: 'В чем разница между char и Character?',
              correctAnswers: ['нет разницы, они оба примитивные типы'],
              wrongAnswers: [
                'char является классом, а Character примитивным типом',
                'нет разницы, они оба классы',
              ],
            },
            {
              id: 5,
              points: 1,
              description: 'Какие существуют типы данных в JavaScript?',
              correctAnswers: ['Boolean'],
              wrongAnswers: ['Function', 'Class', 'String', 'Number'],
            },
          ],
        },
      ],
      progTasks: [
        {
          autoTests: [],
          id: 1,
          description:
            'Напишите функцию, которая подсчитывает, сколькими различными способами вы можете внести сдачу на определенное количество денег, учитывая массив номиналов монет. Например, есть 3 способа дать сдачу на 4, если у вас есть монеты номиналом 1 и 2.',
          name: 'Сложная функция',
          complexityAssessment: 5,
          conditions: [
            {language: ProgrammingLanguage.JavaScript, maxTime: 10, maxMemory: 256, codeExample: 'countChange(4, [1,2]) // => 3 \ncountChange(10, [5,2,3]) // => 4 \ncountChange(11, [5,7]) //  => 0'},
            {language: ProgrammingLanguage.Java, maxTime: 5, maxMemory: 128, codeExample: 'countChange(4, [1,2]) // => 3 \ncountChange(10, [5,2,3]) // => 4 \ncountChange(11, [5,7]) //  => 0'},
          ],
        },
      ],
    },
    {
      description: 'Cool Task',
      timeLimits: 1800,
      name: 'Soft skills',
      id: 2,
      creator: 'p',
      timeOfCreation: 1233,
      language: [ProgrammingLanguage.JavaScript],
      testTasks: [
        {
          name: 'Тест на знание JS',
          id: 3,
          execTime: 600,
          description: 'blalbal',
          questions: [
            {
              id: 1,
              description: 'Какие существуют типы данных в JavaScript?',
              points: 1,
              wrongAnswers: ['Boolean', 'String', 'Number'],
              correctAnswers: ['Function', 'Class'],
            },
            {
              id: 2,
              points: 1,
              description: 'Какие существуют типы данных в Java?',
              correctAnswers: ['byte', 'short', 'int'],
              wrongAnswers: ['char', 'boolean'],
            },
            {
              id: 3,
              points: 1,
              description: 'Как называется код между фигурными скобками?',
              correctAnswers: ['функция', 'секция', 'тело', 'блок'],
              wrongAnswers: ['function', 'int'],
            },
            {
              id: 4,
              points: 1,
              description: 'В чем разница между char и Character?',
              correctAnswers: ['нет разницы, они оба примитивные типы'],
              wrongAnswers: [
                'char является классом, а Character примитивным типом',
                'нет разницы, они оба классы',
              ],
            },
            {
              id: 5,
              points: 1,
              description: 'Какие существуют типы данных в JavaScript?',
              correctAnswers: ['Boolean'],
              wrongAnswers: ['Function', 'Class', 'String', 'Number'],
            },
          ],
        },
      ],
      progTasks: [
        {
          autoTests: [],
          id: 1,
          description:
            'Напишите функцию, которая подсчитывает, сколькими различными способами вы можете внести сдачу на определенное количество денег, учитывая массив номиналов монет. Например, есть 3 способа дать сдачу на 4, если у вас есть монеты номиналом 1 и 2.',
          name: 'Сложная функция',
          complexityAssessment: 5,
          conditions: [
            {language: ProgrammingLanguage.JavaScript, maxTime: 10, maxMemory: 256, codeExample: 'countChange(4, [1,2]) // => 3 \ncountChange(10, [5,2,3]) // => 4 \ncountChange(11, [5,7]) //  => 0'},
            {language: ProgrammingLanguage.Java, maxTime: 5, maxMemory: 128, codeExample: 'countChange(4, [1,2]) // => 3 \ncountChange(10, [5,2,3]) // => 4 \ncountChange(11, [5,7]) //  => 0'},
          ],
        },
      ],
    },
  ],
}
