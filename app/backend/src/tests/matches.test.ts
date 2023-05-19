import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { matchesMock, matchesInProgress, matchesFinished, newMatch } from './mocks/matches.mock';
import * as jwt from 'jsonwebtoken';
import MatchModel from '../database/models/matche';
import TeamModel from '../database/models/team';



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

  it('se atualiza os gols de uma partida', async () => {
    sinon.stub(MatchModel, 'update').resolves()
    const response = await chai
       .request(app)
       .get('/matches/41')
       .send({ homeTeamGoals: 5, awayTeamGoals: 2 })

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal({ message: 'Update sucess' })

  });

  it('se atualiza para finalizar uma partida', async () => {
    sinon.stub(MatchModel, 'update').resolves()
    const response = await chai
       .request(app)
       .get('/matches/1/finish')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal({ message: 'Finished' })

  });

  it('se é possivel adicionar uma nova partida', async () => {
    sinon.stub(jwt, 'verify').resolves({ email: 'admin@admin.com', password: 'secret_admin' });
    sinon.stub(TeamModel, 'findByPk')
    .onCall(0).resolves({ id: 3, teamName: 'Botafogo'} as any)
    .onCall(1).resolves({ id: 1, teamName: 'Palmeiras'} as any)

    const response = await chai
       .request(app)
       .post('/matches')
       .send(
        {
          homeTeam: 11,
          awayTeam: 4,
          homeTeamGoals: 4,
          awayTeamGoals: 0,
        }
       ).set('authorization', 'eyJhbGciOiJIUzI1NiI')

    expect(response.status).to.be.equal(201)
    expect(response.body).to.be.deep.equal(newMatch)

  });


 
});
