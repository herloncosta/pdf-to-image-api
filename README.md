# Conversor de PDF para Imagens com Node.js

Este projeto é um servidor Node.js que permite o upload de arquivos PDF, converte cada página do PDF em imagens e fornece URLs para download das imagens geradas.

## Funcionalidades

-   **Upload de PDF**: Envie um arquivo PDF para o servidor.
-   **Conversão Automática**: Cada página do PDF é convertida em uma imagem.
-   **Download das Imagens**: URLs são fornecidas para download das imagens convertidas.

## Tecnologias Utilizadas

-   **Node.js**: Ambiente de execução JavaScript.
-   **Express**: Framework para criar o servidor web.
-   **Multer**: Middleware para upload de arquivos.
-   **pdf-poppler**: Biblioteca Node.js para conversão de PDF em imagens.

## Pré-requisitos

-   Node.js (v16 ou superior)
-   NPM ou Yarn para gerenciamento de dependências

## Como Executar o Projeto

1. Clone o repositório:

    ```bash
    git clone https://github.com/herloncosta/conversor-pdf-imagem.git
    cd conversor-pdf-imagem
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor:

    ```bash
    node server.js
    ```

4. O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

### 1. Upload de PDF

-   **Método**: `POST`
-   **URL**: `http://localhost:3000/upload`
-   **Body**: Form-data com um campo chamado `pdf` (o arquivo PDF que você deseja enviar).
-   **Resposta**:
    ```json
    {
        "message": "PDF convertido com sucesso!",
        "files": [
            {
                "filename": "page-1.jpeg",
                "url": "http://localhost:3000/download/nome-do-pdf/page-1.jpeg"
            },
            {
                "filename": "page-2.jpeg",
                "url": "http://localhost:3000/download/nome-do-pdf/page-2.jpeg"
            }
        ]
    }
    ```

### 2. Download das Imagens

-   **Método**: `GET`
-   **URL**: `http://localhost:3000/download/:folder/:filename`
    -   `:folder`: Nome da pasta gerada durante a conversão.
    -   `:filename`: Nome do arquivo de imagem (ex: `page-1.jpeg`).
-   **Resposta**: O arquivo de imagem é baixado diretamente.

## Exemplo de Uso

### Upload de PDF

Use o **Postman** ou **cURL** para enviar um PDF:

```bash
curl -X POST -F "pdf=@/caminho/para/seu/arquivo.pdf" http://localhost:3000/upload
```

### Download das Imagens

Use as URLs retornadas no endpoint de upload para baixar as imagens:

```bash
curl -O http://localhost:3000/download/nome-do-pdf/page-1.jpeg
```

## Estrutura do Projeto

```
conversor-pdf-imagem/
├── uploads/              # Armazena temporariamente os PDFs enviados
├── converted/            # Armazena as imagens convertidas
├── server.js             # Código principal do servidor
├── package.json          # Dependências e scripts do projeto
└── README.md             # Documentação do projeto
```

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
