# gitflow-automation-test
A ideia para esse projeto é documentar alguns processos que utilizei para estabelecer a garantia de uma padronização de commit. Essa ideia se torna cada vez mais necessária em situações nas quais uma equipe grande começa a trabalhar em um projeto de maneira assíncrona. Para facilitar a vida dessas pessoas, melhorando essa comunicação e versionamento de código, pensando também em padronização e em facilitar a vida do líder técnico, que precisa passar pelos pull requests aprovando-os, vamos iniciar a documentação da implementação dessas ferramentas.

### Conventional Commits
<details>
  Uma convenção que define um conjunto de regras para criar um histórico de commits fácil de ler e padronizado. Essas regras foram criadas por convenção pelo time de desenvolvimento do Angular, e foram abraçados por grande parte da comunidade.

Na prática, essa convenção define que o commit possui uma estrutura padrão

```jsx
<tipo>[escopo opcional]: <descrição>
[corpo opcional]
[rodapé(s) opcional(is)]
```

A mensagem deve ser escrita com letras minúsculas, além de espaços entre os dois pontos.

Os tipos que podem ser utilizados são os seguintes:

- **chore:** Atualização de tarefas que não ocasionam alteração no código de produção, mas mudanças de ferramentas, mudanças de configuração e bibliotecas.
- **feat:** São adições de novas funcionalidades ou de quaisquer outras novas implantações ao código.
- **fix:** Essencialmente definem o tratamento de correções de bugs.
- **refactor:** Utilizado em quaisquer mudanças que sejam executados no código, porém não alterem a funcionalidade final da tarefa impactada.
- **docs:** Inclusão ou alteração somente de arquivos de documentação.
- **perf:** Uma alteração de código que melhora o desempenho.
- **style:** Alterações referentes a formatações na apresentação do código que não afetam o significado do código, como por exemplo: espaço em branco, formatação, ponto e vírgula ausente etc.
- **test:** Adicionando testes ausentes ou corrigindo testes existentes nos processos de testes automatizados (TDD).
- **build:** Alterações que afetam o sistema de construção ou dependências externas (escopos de exemplo: gulp, broccoli, npm).
- **ci:** Mudanças em nossos arquivos e scripts de configuração de CI (exemplo de escopos: Travis, Circle, BrowserStack, SauceLabs).
- **env:** Utilizado na descrição de modificações ou adições em arquivos de configuração em processos e métodos de integração contínua (CI), como parâmetros em arquivos de configuração de containers.

Falando da iJunior, costumamos utilizar apenas:

- **test:** Adicionando testes ausentes ou corrigindo testes existentes nos processos de testes automatizados (TDD).
    - Utilizamos a sigla “tst” para referenciar o tipo.
- **feat:** São adições de novas funcionalidades ou de quaisquer outras novas implantações ao código.
    - Utilizamos a sigla “feat” para referenciar o tipo.
- **fix:** Essencialmente definem o tratamento de correções de bugs.
    - Utilizamos a sigla “fix” para referenciar o tipo.
- **docs:** Inclusão ou alteração somente de arquivos de documentação.
    - Utilizamos a sigla “doc” para referenciar o tipo.
- **refactor:** Utilizado em quaisquer mudanças que sejam executados no código, porém não alterem a funcionalidade final da tarefa impactada.
    - Utilizamos a sigla “ref” para referenciar o tipo.
- **revert:**  utilizado quando revertemos o projeto para um certo commit
    - Utilizamos a sigla “rvt” para referenciar o tipo.
</details>

O código implementado aqui será simples, apenas com a função de testar as funcionalidades das ferramentas implementadas.
São essas ferramentas:

### Commitlint
<details>
Com o Commitlint conseguimos verificar se a mensagem de commit que escrevemos realmente está dentro dos padrões pré definidos pelo Conventional Commit. Vamos usar os padrões do Angular, mas ele pode ser alterado e podemos até mesmo criar o nosso próprio padrão.

Antes de fazermos um commit, vamos rodar a biblioteca para fazer essa verificação. Se a mensagem do commit não estiver seguindo o padrão, será gerado um erro no terminal.

[Commitlint](https://github.com/conventional-changelog/commitlint)

Acima, temos o link da documentação do Commitlint no gthub, onde tem um passo a passo que ensina a instalar a ferramenta no seu projeto.

Agora precisamos falar pro nosso código que ele precisa rodar o Commitlint, depois que um commit for realizado, e para isso vamos utilizar o 

[Husky](https://github.com/typicode/husky) 

que nada mais é que uma aplicação que nos permite criar funcionalidades automatizadas utilizando ferramentas do Git, e ativando essas funcionalidades através de gatilhos que nós mesmos definimos.
</details>

### Husky
<details>
O Husky vai nos ajudar a criarmos ganchos para o Git de uma maneira simples. Os ganchos são ações que vão ser disparadas em determinados momentos. Nesse caso, vamos criar um gancho para ser disparado antes de um commit ser inicializado.

Dessa maneira, sempre que fizermos um commit, vamos configurar o Husky para executar o Commitlint e verificar se a mensagem do commit está seguindo os padrões recomendados.

Com isso, automatizamos o processo de verificação da mensagem e não precisamos nos preocupar em rodá-lo manualmente. Mesmo com o Commitlint, pode ser que você esqueça de fazer a verificação e não queremos que isso aconteça. Implementando e utilizando bem o Husky, nenhum commit com a mensagem errada vai passar.

      💡 Atenção: O Husky precisa de um repositório no Git criado antes de iniciar o projeto. 
      Você precisa ter um repositório antes de instalar o Husky, se não vai dar problema e vai ter que quebrar muito a cabeça.

</details>

### Commitizen
<details>
O Commitizen é uma biblioteca que vai nos ajudar a criar os commits seguindo o padrão do Conventional Commit. Ela gera uma interface no terminal e assim vamos conseguir acessar todos os tipos de commits e suas descrições:

Ao adotar um novo padrão como estamos fazendo, precisamos de um tempo até decorarmos os tipos e não precisar ficar consultando a documentação para conferir qual tipo usar. É aí que essa biblioteca vai nos ajudar.

Iremos criar um script que podemos rodar sempre que quisermos fazer um commit guiado. Dessa maneira, só precisamos seguir o passo a passo que a biblioteca implementa e geraremos um commit dentro do padrão.

Nem sempre vamos precisar usá-la, mas gosto de deixar instalada, pois se precisar é só executar o script.

A documentação pode ser encontrada no GitHub de forma bem didática.

[Commitizen](https://github.com/commitizen/cz-cli)
</details>

### Roteiro de Instalação
<details>
  Primeiro de tudo abram o git bash e entrem no melhor diretório para vocês. Nesse diretório, criem uma pasta para o novo projeto.

```jsx
mkdir [nome escolhido para a pasta]
```

Depois entre na pasta criada

```jsx
cd [nome escolhido para a pasta]
```

E inicie um repositório no git

```jsx
git init
```

Agora inicie um projeto 

```jsx
npm init -y
```

E instale, primeiramente, o Commitlint

```jsx
npm install --save-dev @commitlint/{cli,config-conventional}
```

Depois execute a seguinte linha:

```jsx
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

Caso dê erro, criem na raiz do projeto um arquivo chamado commitlint.config.js e insiram nele

```jsx
module.exports = { extends: ['@commitlint/config-conventional'] };
```

Testem pra ver se tudo tá funcionando até aqui, no primeiro teste, deve dar erro

```jsx
echo "teste" | npx commitlint
```

Nesse segundo teste, é pra dar certo, vulgo, não apresentar nenhum erro no terminal

```jsx
echo "feat: teste" | npx commitlint
```

Depois disso, é o momento de baixar o Husky, que vai ativar alguns gatilhos pra gente. Esses gatilhos são ativados quando o código atinge certo tempo de execução, e definimos um script pra ser rodado, dado esse tempo atingido.

Para instalar o Husky

```jsx
npm install husky --save-dev
```

Agora, para ativar os gatilhos

```jsx
npx husky install
```

Nisso, uma pasta para o Husky com um arquivo pré-configurado já é criada pra gente.

Agora, exeute a seguinte linha no terminal

```jsx
npm pkg set scripts.commitlint="commitlint --edit"
```

E depois

```jsx
npx husky add .husky/commit-msg 'npm run commitlint ${1}'
```

Assim, é criado um novo arquivo com um Hook (gancho/gatilho), para a mensagem de commit ser avaliada pelo Commitlint.

Lembre-se de inserir o seguinte script no seu package.json, ele irá permitir que quando outras pessoas forem rodar seu código, elas possam executar o Husky com um comando mais prático

```jsx
"prepare": "husky install"
```

E adicione, também no package.json o seguinte gatilho, que basicamente pede ao Commitlint que escaneie o commit em questão e deixe-o passar ou não.

```json
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
```

Agora, você vai baixar o Commitizen

```jsx
npm install commitizen -g
```

Depois, execute a seguinte linha no terminal:

```jsx
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

Agora, adicione o seguinte script em seu package.json, que vai ter a funcionalidade de rodar o Commitizen. Ou seja, vai commitar, dê o comando npm run commit no terminal

```jsx
"commit": "cz"
```

Beleza, estamos nos passos finais. Agora, você vai adicionar no seu package.json, um novo hook dentro do objeto do Husky, que basicamente vai executar o Commitizen.

```jsx
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "prepare-commit-msg": "exec < /dev/tty && npx cz --hook || true"
    }
  },
```

Chegou o momento de testar, mas antes, rodem o comando npm run prepare, só pra reinstalar os Hooks e garantir que eles vão estar todos sendo reconhecidos.

Vamos começar dando um git pull no repositório, que no meu caso está certamente vazio, mas é interessante vocês fazerem isso pra garantir que não vão sobrescrever código de alguém, ou dar conflito.

Depois do pull, deem o “git add .” 

Enfim, deem o comando para commitar normalmente: ”git commit -m ‘seu commit”

Vamos testar se está tudo funcionando.

Primeiro, 
    
    tente mandar um commit fora do padrão correto

    Depois, caso dê erro ( e deve dar ), envie o commit da maneira correta

E se ainda assim tá cansativo commitar da forma correta, experimente rodar o comando npm run commit

Esse comando executa o Commitizen, e ele abre uma interface no terminal para você montar seu commit, e não precisa preocupar porque ele tá orientado ao conventional commit igual ao Commitlint, então os dois não vão se confrontar, e vão te dar opção de commitar direito, seja pelo comando do git, ou pelo script.

No fim das contas, ele vai perguntando passo a passo para completar seu commit, e reparem que, como nós configuramos os gatilhos (hooks) no Husky, depois que o commit feito pelo Commitizen é concluído, o Commitlint ainda roda para verificá-lo.

E é isso, lembrem de dar o git push para subir as alterações para a branch.
</details>
