# API-Climatica-Com-JWT

• O que é JWT e como ele funciona?

O JWT (JSON Web Token) é uma forma de autenticação que permite que um servidor verifique a identidade de um usuário sem precisar armazenar informações sobre ele.

Como utilizar o pacote jsonwebtoken no Node.js?

    Um servidorzinho

    Algumas rotas: POST E GET de usuarios, POST de login

    Conexão com o MongoDB do Mongolabs

    Criar usuários

    Encriptar senhas

    Implementar JWT durante o login

    Passar middleware que tornará a rota passível de autenticação. E vai conferir o JWT


Como utilizar o pacote bcryptjs no Node.js?

bcrypt works by combining hashing and a technique known as salting, which is specifically developed to make stored passwords more safe.

Aqui está um detalhamento do procedimento:

    Hashing: Bcrypt processa a senha de um usuário usando uma função matemática sofisticada. Esta função converte a senha em uma sequência de caracteres de comprimento fixo que parece aleatória e sem sentido. O valor hash é o que é mantido no banco de dados, não a senha original. Como a função de hash é unidirecional, a reversão do hash não produzirá a senha original.
    Salting: Para melhorar a segurança, o bcrypt incorpora um número aleatório chamado salt. Este sal é exclusivo para cada senha e é anexado a ela antes do hash. O valor combinado (senha + salt) é então passado para a função hash.

Bcrypt, você precisa primeiro instalá-lo em seu projeto. Isso pode ser feito usando o gerenciador de pacotes npm, que é fornecido com o Node. js. Depois de instalado, você pode importar o módulo bcrypt em seu código e começar a usá-lo para criptografar e verificar senhas.

Como proteger rotas com middleware?

Primeiro, importamos NextRequest e NextResponse do Next.js. Esses são fundamentais para manipular requisições e respostas.

Em seguida, verificamos se há um cookie chamado currentUser, que indica se o usuário está autenticado.

Quando o usuário está autenticado e tenta acessar a página de login (/login), redirecionamos ele para o dashboard (/dashboard).

Se ele já está logado, não faz sentido deixá-lo voltar para a página de login. Por outro lado, se o usuário não estiver autenticado e tentar acessar qualquer página dentro do dashboard (/dashboard), mandamos ele de volta para a página de login (/login). Isso garante que apenas pessoas autorizadas entrem em áreas restritas.

Se nenhuma dessas condições for atendida, permitimos que a requisição continue normalmente para outras rotas não protegidas.

Finalmente, configuramos as rotas usando o matcher para especificar quais devem ser protegidas pela Middleware.

Excluímos rotas de API, arquivos estáticos e imagens, garantindo que nossa Middleware não interfira com esses recursos.

• Como armazenar e utilizar tokens no cliente?

armazenar o token no local/session storage pode gerar alguns problemas de segurança sérios na aplicação. Logo, a melhor maneira que encontrei, foi utilizando cookies. Após gerar o token no servidor, basta envia-lo na resposta para o cliente e armazena-lo em um cookie.

Posteriormente, para cada requisição feita a uma rota protegida, sera necessário enviar o token no cabeçario da requisição, confome vimos na aula, onde o instrutor usou o Insominia. Mas, no meu caso, como tive que implementar isso no front-end, utilizei um middleware que é chamado antes de cada rota protegida ser acessada. Esse middleware é responsável por acessar o valor do token armazenado dentro do cookie no lado do cliente e adicionar esse token no cabeçario da requisição, da seguinte forma:

Dessa forma, o token pode ser verificado e validado pelo servidor para tornar a rota protegida.

• Quais são as boas práticas de segurança para usar JWT?

Estrutura:

    1. Header: É o cabeçalho do JWT, que contém metadados sobre o tipo do token e o algoritmo de assinatura utilizado. Exemplo:

{
 "alg": "HS256", // Algoritmo de assinatura
 "typ": "JWT"  // Tipo do token
}

    2. Payload: É o corpo do JWT, que contém as reivindicações, que são informações sobre uma entidade (geralmente o usuário) e metadados adicionais. Exemplo:

{
 "sub": "1234567890",
 "name": "John Doe",
 "admin": true
}

    3. Signature: É a assinatura do JWT, que adiciona segurança a esse sistema de autenticação. A assinatura garante a possibilidade de verificar se o token foi adulterado durante a transmissão. Ela é criada a partir do header e do payload usando uma chave secreta.
    
    Processo de Autenticação

    1. Login: Quando um usuário faz o login em uma aplicação, um JWT pode ser gerado no servidor após a autenticação bem-sucedida.
    2. Emissão do Token: O servidor cria um JWT com as informações relevantes, como o ID do usuário e as permissões. O token é então assinado com uma chave secreta para garantir sua integridade. É como um carimbo!
    3. Entrega ao Cliente: O JWT é enviado ao cliente (geralmente um cookie ou no corpo da resposta da requisição) para que ele possa ser usado nas solicitações subsequentes.
    4. Uso do Token: O cliente inclui o JWT nas solicitações ao servidor, geralmente no cabeçalho "Authorization" usando o prefixo "Bearer". Exemplo:

{
 "Authorization": "Bearer <seu-token-jwt>"
}

    5. Validação do Token: O servidor valida o JWT descriptografando a assinatura com a chave secreta. Se a assinatura for válida e o token não tiver expirado, o servidor considera o usuário autenticado e autoriza a solicitação.
