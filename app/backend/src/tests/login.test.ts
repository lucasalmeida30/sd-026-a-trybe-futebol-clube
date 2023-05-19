import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import * as jsonwebtoken from 'jsonwebtoken';
import user from './mocks/user.mock';
import User from '../database/models/user';


chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  afterEach(()=>{
    sinon.restore()
  })

  it('se a API retorna um status 200 com os dados correto', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2ODQ0NDg5NzEsImV4cCI6MTY4NDYyMTc3MX0.D5B4isLanJjbUXpyCkrO2tpmPa8rDXpdnPcW1DoBlTY'

    sinon.stub(User, "findOne").resolves(user as unknown as User);
    sinon.stub(jsonwebtoken, 'sign').resolves(token);
    const response = await chai
       .request(app)
       .post('/login')
       .send({ email: 'user@user.com', password: 'secret_user'})

      
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal({ token })

  });

  it('sem o email deve retornar um status 400 ', async () => {
    const response = await chai
       .request(app)
       .post('/login')
       .send({ password: 'secret_user'})
      
    expect(response.status).to.be.equal(400)
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })

  });

  it('sem a password deve retornar status 400', async () => {
    const response = await chai
       .request(app)
       .get('/login')
       .send({ email: 'user@user.com'})
      
    expect(response.status).to.be.equal(400)
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' })

  });

  it('se nao passar uma senha valida retorna erro', async () => {
    const response = await chai
       .request(app)
       .get('/login')
       .send({ email: 'user@user.com', password: 'senhasenha'})
      
    expect(response.status).to.be.equal(401)
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })

  });

  it('se nao passar uma email valido retorna erro', async () => {
    const response = await chai
       .request(app)
       .get('/login')
       .send({ email: 'namee@user.com', password: 'secret_user'})
      
    expect(response.status).to.be.equal(401)
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })

  });

  it('se nao passar um email e uma senha valido retorna erro', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2ODQ0NDg5NzEsImV4cCI6MTY4NDYyMTc3MX0.D5B4isLanJjbUXpyCkrO2tpmPa8rDXpdnPcW1DoBlTY'
    
    sinon.stub(User, "findOne").resolves(user as unknown as User);
    sinon.stub(jsonwebtoken, 'sign').resolves(token);
    const response = await chai
       .request(app)
       .get('/login/role')
      
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal({ role: 'user'})

  });
 
});
