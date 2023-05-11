import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/team'
import teamsMock from './mocks/teams.mock';


import { Response } from 'superagent';
import { before, after } from 'node:test';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota de teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })

  it('se consegue retornar todos os times com o método GET', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamsMock as unknown as TeamModel[])
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
      

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock)

  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
