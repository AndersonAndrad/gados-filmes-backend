import yup from 'yup'
import { CustomHttpError } from '../erros/custom.http.error.js'
export class ErrorMiddlewares {
  handleRequestErrors () {
    return (error, req, res, next) => {
      if (error instanceof yup.ValidationError) {
        return res.status(400).send({ mensagem: error.message })
      }

      if (error instanceof CustomHttpError) {
        return res.status(error.statusCode).send({ mensagem: error.message })
      }

      if (error instanceof Error) {
        console.error(error.message)
        return res.status(500).send({ mensagem: 'Servidor com problemas! Volte mais tarde.' })
      }
    }
  }

  handleErro404 () {
    return (req, res) => res.status(404).json({ mensagem: 'Desculpe, a página que você está procurando não foi encontrada.' })
  }
}
