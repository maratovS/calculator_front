import http from '../http-common'

class CalculatorDataService {
  getResult(fn, sn, oper, system) {
    return http.get(`/result/${fn}&${sn}&${oper}&${system}`)
  }

  create(data) {
    return http.post('/calculate', data)
  }
}

export default new CalculatorDataService()