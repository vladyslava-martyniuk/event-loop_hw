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
  const logge = time => console.log(`Resolved after ${time}ms`);
//Перевірка
  delay(2000).then(logger); // Resolved after 2000ms
  delay(1000).then(logger); // Resolved after 1000ms
  delay(1500).then(logger); // Resolved after 1500ms
 //Завдання 2: Функція toggleUserState() Ця функція має приймати allUsers,
 //  userName і повертати проміс, який переходить в стан "resolved" з оновленим списком користувачів updatedUsers.
  const toggleUserState = (allUsers, userName) => {
    return new Promise(resolve => {
      const updatedUsers = allUsers.map(user =>
        user.name === userName ? { ...user, active: !user.active } : user
      );
      resolve(updatedUsers);
    });
  };
  const logger = updatedUsers => console.table(updatedUsers);
  toggleUserState(users, 'Mango').then(logger);
  toggleUserState(users, 'Lux').then(logger);
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