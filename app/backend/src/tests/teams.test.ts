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

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota de teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findByPk as sinon.SinonStub).restore();
  })

  it('se consegue retornar todos os times com o método GET', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamsMock as unknown as TeamModel[])
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
