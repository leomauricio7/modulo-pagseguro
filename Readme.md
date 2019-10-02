# Modulo de integração com o gatway de pagamento do pagseguro
## Checkout Transparente
## Checkout Split
* Modulo desenvolvido por Leonardo Mauricio
* Mas informações entrar em contao via email: **leomauricio7@gmail.com**
![PagSeguro-2](https://user-images.githubusercontent.com/30731660/65697678-b5e27200-e051-11e9-836c-d3d1319c311c.png)
## Modelo de JSON para cada endpoint
### criar sessão
    request {
      method: GET,
      url: '/api/session',
    }
### metdodos de pagamento
    request {
      method: GET,
      url: '/api/payment-method',
      data: {
          session_id: string,
          amout": string
      }
    }
### bandeira do cartão
    request {
      method: GET,
      url: '/api/getBin',
      data: {
          session_id: string,
          bin": string
      }
    }

