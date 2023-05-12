import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/team'
import teamsMock from './mocks/teams.mock';


import { Response } from 'superagent';
import { before, after } from 'node:test';
import TeamController from '../controllers/team.controllers';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota de teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;
  const teamController = new TeamController()
  after(()=>{
    (teamController.findAll as sinon.SinonStub).restore();
    (teamController.findById as sinon.SinonStub).restore();
  })

  it('se consegue retornar todos os times com o método GET', async () => {
    sinon.stub(teamController, 'findAll').resolves(response.status(200).json(teamsMock))
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
      
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock)

  });

  it('se consegue retornar um time buscado por id', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(teamsMock[0] as unknown as TeamModel)
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')
      
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock[0])

  });

 
});
