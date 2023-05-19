import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { matchesMock, matchesInProgress, matchesFinished } from './mocks/matches.mock';
import * as jwt from 'jsonwebtoken';
import MatchModel from '../database/models/matche';



chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota de matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  afterEach(()=>{
    sinon.restore()
  })

  it('se retorna status 200 com a lista de partidas', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchesMock as MatchModel[])
    const response = await chai
       .request(app)
       .get('/matches')
      
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(matchesMock)

  });

  it('deve retorna lista de partidas em progresso', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress as MatchModel[])
    const response = await chai
       .request(app)
       .get('/matches')
       .query({ inProgress: true })
      
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(matchesInProgress)
  });

  it('deve retornar lista de partidas finalizadas', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matchesFinished as MatchModel[])
    const response = await chai
       .request(app)
       .get('/matches')
       .query({ inProgress: false })
      
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(matchesFinished)

  });

 
});
