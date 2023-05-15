import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/team'
import teamsMock from './mocks/teams.mock';


import { Response } from 'superagent';
import { before, after } from 'node:test';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota de teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;
  afterEach(()=>{
    sinon.restore();
  })

  it('se consegue retornar todos os times com o método GET', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[])
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
      
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock)

  });

  it('deve retornar undefined com id invalido', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(undefined)
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/697')
      
    expect(chaiHttpResponse.status).to.be.equal(404)
    expect(chaiHttpResponse.body).to.be.deep.equal('team nao encontrado')

  });

  it('deve retornar status 200 e elemento certo', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(teamsMock[1] as TeamModel)
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')
      
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock[1])

  });

 
});
