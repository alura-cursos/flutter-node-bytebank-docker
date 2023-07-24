// index.js
const { exec } = require('child_process');

exec('node services/authService.js', (err, stdout, stderr) => {
  if (err) {
    console.error('Error starting Authentication service:', err);
  } else {
    console.log(stdout);
    exec('node services/balanceService.js', (err, stdout, stderr) => {
      if (err) {
        console.error('Error starting Balance service:', err);
      } else {
        console.log(stdout);
        exec('node services/transactionService.js', (err, stdout, stderr) => {
          if (err) {
            console.error('Error starting Transaction service:', err);
          } else {
            console.log(stdout);
            console.log('All services are up and running.');
          }
        });
      }
    });
  }
});
