const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')

operation()

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'o que você deseja fazer?',
        choices: [
          'criar conta',
          'consultar saldo',
          'Depositar',
          'sacar',
          'Cheque especial',
          'sair'
        ]
      }
    ])
    .then(answer => {
      const action = answer['action']
      if (action === 'criar conta') {
        createAcconunt()
      } else if (action === 'consultar saldo') {
        getAccountBalance()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'sacar') {
        withDraw()
      } else if (action === 'sair') {
        console.log(chalk.bgBlue.black('obrigdo por usar o Accounts'))
        process.exit()
      } else if (action === 'Cheque especial') {
        chequeEspecial()
      }
    })
    .catch(err => {
      console.log(err)
    })
}

//criação de conta

function createAcconunt() {
  console.log(chalk.bgGreen.black('parabens por escolher nosso banco '))
  console.log(chalk.green('defina as opções da sua conta a seguir'))

  builAccount()
}

function builAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'digite um nome para sua conta '
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']
      console.info(accountName)

      //criação de diretorio
      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      //verificação de nome do usuário
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('esta conta ja existe'))
        builAccount()
        return
      }

      //criação do json da conta do usuario
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        err => {
          console.log(err)
        }
      )

      console.log(chalk.green('parabens sua conta foi criada'))
      operation()
    })
    .catch(err => {
      console.log(err)
    })
}

//deposito na conta
function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'qual o nome da sua conta'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      //verificando se a conta existe
      if (!checkAccount(accountName)) {
        return deposit()
      }
      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'quanto você deseja depositar'
          }
        ])
        .then(answer => {
          const amount = answer['amount']

          addAmount(accountName, amount)
          operation()
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
}
//checando se conta existe
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('essa conta nao existe'))
    return false
  }
  return true
}

// adicionando saldo
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(chalk.bgRed.black('ocorreu um erro tente novamnte mais tarde'))
    return deposit()
  }
  accountData.balance = parseFloat(amount + parseFloat(accountData.balance))

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    err => {
      console.log(err)
    }
  )
  console.log(
    chalk.green(`foi depositado o valor de R$${amount} na sua conta `)
  )
}

//função que acessa as contas
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf-8',
    flag: 'r'
  })

  return JSON.parse(accountJSON)
}

//mostrar o valor do saldo

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'qual o nome da sua conta?'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      //verificando se a conta existe
      if (!checkAccount(accountName)) {
        return getAccountBalance()
      }

      const accountData = getAccount(accountName)
      console.log(
        chalk.bgBlue.black(`o saldo da sua conta é de R$${accountData.balance}`)
      )
      operation()
    })
    .catch(err => {
      console.log(err)
    })
}

//sacar valor da conta do usuario

function withDraw() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'qual nome da sua conta?'
      }
    ])
    .then(answer => {
      const accountName = answer['accountName']

      if (!getAccount(accountName)) {
        return withDraw()
      }
      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'quanto você deseja sacar?'
          }
        ])
        .then(answer => {
          const amount = answer['amount']
          removeAmount(accountName, amount)
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde')
    )
    return withDraw()
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('valor indisponível'))
    return withDraw()
  }
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    err => {
      console.log(err)
    }
  )
  console.log(
    chalk.green(`foi realizado um saque de R$${amount} na sua conta `)
  )
  operation()
}

// function chequeEspecial() {
//   inquirer
//     .prompt([
//       {
//         name: 'accountName',
//         message: 'Olá, qual nome da sua conta?'
//       }
//     ])
//     .then(answer => {
//       const accountName = answer['accountName']

//       if (!checkAccount(accountName)) {
//         console.log(chalk.bgRed.black('essa conta nao existe'))
//         return chequeEspecial()
//       }

//       inquirer
//         .prompt([
//           {
//             name: 'emprestimo',
//             message: 'qual valor do seu emprestimo'
//           }
//         ])
//         .then(answer=>{
//           const emprestimo = answer['emprestimo']

//         })
//         .catch(err => {
//           console.log(err)
//         })
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

// function valorBanco(amount){
//   console.log(chalk.green('o banco tem em caixa o valor de R$25.000'))
//   const caixa =
// }
