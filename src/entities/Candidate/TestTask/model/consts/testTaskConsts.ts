// import {TaskSetPack} from '../types/testTask'
// import {ProgrammingLanguage} from 'core/enums'

// export const testTaskDataExample: TaskSetPack = {
//   id: 1,
//   name: 'JAVA_JUNIOR',
//   timeLimits: 10800,
//   description: '',
//   numOfTry: 1,
//   data: [
//     {
//       description: '',
//       timeLimits: 7200,
//       name: 'Java_1',
//       id: 1,
//       creator: 'Admin',
//       timeOfCreation: 1233,
//       language: [ProgrammingLanguage.JavaScript, ProgrammingLanguage.Java],
//       testTasks: [
//         {
//           name: 'Тест на базовые знания JS/Java',
//           id: 3,
//           execTime: 600,
//           description: '',
//           questions: [
//             {
//               id: 1,
//               description: 'Какие существуют типы данных в JavaScript?',
//               points: 1,
//               wrongAnswers: ['Boolean', 'String', 'Number'],
//               correctAnswers: ['Function', 'Class'],
//             },
//             {
//               id: 2,
//               points: 1,
//               description: 'Какие существуют типы данных в Java?',
//               correctAnswers: ['byte', 'short', 'int'],
//               wrongAnswers: ['char', 'boolean'],
//             },
//             {
//               id: 3,
//               points: 1,
//               description: 'Как называется код между фигурными скобками?',
//               correctAnswers: ['функция', 'секция', 'тело', 'блок'],
//               wrongAnswers: ['function', 'int'],
//             },
//             {
//               id: 4,
//               points: 1,
//               description: 'В чем разница между char и Character?',
//               correctAnswers: ['нет разницы, они оба примитивные типы'],
//               wrongAnswers: [
//                 'char является классом, а Character примитивным типом',
//                 'нет разницы, они оба классы',
//               ],
//             },
//             {
//               id: 5,
//               points: 1,
//               description: 'Какие существуют типы данных в JavaScript?',
//               correctAnswers: ['Boolean'],
//               wrongAnswers: ['Function', 'Class', 'String', 'Number'],
//             },
//           ],
//         },
//       ],
//       progTasks: [
//         {
//           id: 1,
//           description:
//             'Даны три числа. Напишите функцию, возвращающую сумму трех чисел.',
//           name: 'Сумма трёх чисел',
//           complexityAssessment: 30,
//           conditions: [
//             {language: ProgrammingLanguage.JavaScript, maxTime: 500, maxMemory: 2, codeExample: 'function summ(n) {\n\tconst result = 0\n\tn.forEach(i => result += i)\n\treturn result\n}', autoTests: "function result(input, answer) {\n\tconst res = summ(input)\n\tif (res !== answer) {\n\t\tthrow new Error(`Input: ${input}, Current Output: ${res}, Expected Output: ${answer}`)\n\t}\n}\n\nresult([1, 2, 3], 6)\nresult([2, 3, 4], 9)\nresult([3, 4, 5], 12)\nresult([4, 5, 6], 15)\n\nconsole.log(`All tests done!`)"},
//             {language: ProgrammingLanguage.Java, maxTime: 500, maxMemory: 2, codeExample: 'public class Sum {\n\tpublic static int sum(int[] n) {\n\t\tprivate int answer;\n\t\t\n\t\tfor (int i : n) {\n\t\t\tanswer += i;\n\t\t}\n\t\treturn answer;\n\t}\n}', autoTests: "class Test {\n\tpublic static boolean result(int[] n, int trueResult) {\n\tSum tmp = new Sum();\n\t\tint res = tmp.sum(n);\n\t\tif (res != trueResult) {\n\t\t\tthrow new Exception(String.format(\"Input: [%d, %d, %d], Current Output: %d, Expected Output: %d\", n[0], n[1], n[2], res, trueResult));\n\t\t}\n\t}\n}\n\nclass Main {\n\tpublic static void main(String[] args) {\n\t\tTest test = new Test();\n\t\ttest.result({1, 2, 3}, 6);\n\t\ttest.result({2, 3, 4}, 9);\n\t\ttest.result({3, 4, 5}, 12);\n\t\ttest.result({4, 5, 6}, 15);\n\t\tSystem.out.println(\"All tests done!\");\n\t}\n}"},
//           ],
//         },
//       ],
//     },
//     {
//       description: '',
//       timeLimits: 600,
//       name: 'Soft skills',
//       id: 2,
//       creator: 'Admin',
//       timeOfCreation: 1233,
//       language: [],
//       testTasks: [
//         {
//           name: 'Тест на знание JS',
//           id: 3,
//           execTime: 600,
//           description: 'blalbal',
//           questions: [
//             {
//               id: 1,
//               description: 'Какие существуют типы данных в JavaScript?',
//               points: 1,
//               wrongAnswers: ['Boolean', 'String', 'Number'],
//               correctAnswers: ['Function', 'Class'],
//             },
//             {
//               id: 2,
//               points: 1,
//               description: 'Какие существуют типы данных в Java?',
//               correctAnswers: ['byte', 'short', 'int'],
//               wrongAnswers: ['char', 'boolean'],
//             },
//             {
//               id: 3,
//               points: 1,
//               description: 'Как называется код между фигурными скобками?',
//               correctAnswers: ['функция', 'секция', 'тело', 'блок'],
//               wrongAnswers: ['function', 'int'],
//             },
//             {
//               id: 4,
//               points: 1,
//               description: 'В чем разница между char и Character?',
//               correctAnswers: ['нет разницы, они оба примитивные типы'],
//               wrongAnswers: [
//                 'char является классом, а Character примитивным типом',
//                 'нет разницы, они оба классы',
//               ],
//             },
//             {
//               id: 5,
//               points: 1,
//               description: 'Какие существуют типы данных в JavaScript?',
//               correctAnswers: ['Boolean'],
//               wrongAnswers: ['Function', 'Class', 'String', 'Number'],
//             },
//           ],
//         },
//       ],
//       progTasks: [],
//     },
//   ],
// }
