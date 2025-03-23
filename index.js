// Завдання 1: Функція delay(ms)
// Повертає проміс, що переходить в стан "resolved" через ms мілісекунд. 
//Зі значенням ms відкладення.
const delay = ms => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  };
  const logTime = time => console.log(`Resolved after ${time}ms`);
  // Перевірка
  delay(2000).then(logTime);
  delay(1000).then(logTime);
  delay(1500).then(logTime);
  //Завдання 2: Перепиши функцію toggleUserState() так, 
  // щоб вона не використовувала callback-функцію 
  // callback, а приймала всього два параметри allUsers
  //  і userName і повертала проміс.

  const toggleUserState = (allUsers, userName) => {
    return new Promise(resolve => {
      const updatedUsers = allUsers.map(user =>
        user.name === userName ? { ...user, active: !user.active } : user
      );
      resolve(updatedUsers);
    });
  };
  const logUsers = updatedUsers => console.table(updatedUsers);
  // Перевірка
  const users = [
    { name: "Mango", active: true },
    { name: "Lux", active: false }
  ];
  toggleUserState(users, 'Mango').then(logUsers);
  toggleUserState(users, 'Lux').then(logUsers);
  //Завдання 3: Функція makeTransaction() Ця функція також має повертати 
  // проміс, який переходить в стан "resolved" при успішному виконанні транзакції (logSuccess викликається), або в стан "rejected" при помилці (logError викликається).
  const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const makeTransaction = transaction => {
    return new Promise((resolve, reject) => {
      const delay = randomIntegerFromInterval(200, 500);
      setTimeout(() => {
        const canProcess = Math.random() > 0.3;
        if (canProcess) {
          resolve({ id: transaction.id, time: delay });
        } else {
          reject(transaction.id);
        }
      }, delay);
    });
  };
  const logSuccess = ({ id, time }) => {
    console.log(`Transaction ${id} processed in ${time}ms`);
  };
  const logError = id => {
    console.warn(`Error processing transaction ${id}. Please try again later.`);
  };
  // Перевірка
  makeTransaction({ id: 70, amount: 150 })
    .then(logSuccess)
    .catch(logError);
  makeTransaction({ id: 71, amount: 230 })
    .then(logSuccess)
    .catch(logError);
  makeTransaction({ id: 72, amount: 75 })
    .then(logSuccess)
    .catch(logError);
  makeTransaction({ id: 73, amount: 100 })
    .then(logSuccess)
    .catch(logError);