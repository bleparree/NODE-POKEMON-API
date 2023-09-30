import supertest from 'supertest'
import { createServer } from '../utils/server';
import { delay } from '../utils/testUtils';
import { PokemonService } from '../services/pokemonService';
import { Pokemon } from '../models/pokemon';

const app = createServer();

beforeAll(async () => {
    await delay();
});

describe('pokemon', () => {
    let token = '';
    describe('test login & get auth token', () => {
        it('Should return a 401', async () => {
            await supertest(app).post(`/api/login`).query({ username: 'sdf', password: 'sdf' }).send().expect(401);
        }),
        it('Should return 200 and a token', async () => {
            await supertest(app).post(`/api/login`).query({ username: 'pikachu', password: 'pikachu' }).then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.token).not.toBeNull();
                expect(res.body.token).not.toBe('');
                token = res.body.token;
            });
        })
    }),
    describe('get pokemon route', () => {
        describe('Call without Token', () => {
            it("Should return a 401", async () => {
                await supertest(app).get(`/api/pokemon/0`).expect(401);
            })
        });
        // describe('Given the pokemon does not exist', () => {
        //     it("should return a 404", async () => {
        //         await supertest(app).get(`/api/pokemon/0`).set('Authorization', 'bearer ' + token).expect(404);
        //     });
        // });
        describe('The very first Pokemon', () => {
            it("should return a 200", async () => {
                let pokemonService = new PokemonService();
                const mock = jest.spyOn(pokemonService, 'getPokemonById');
                mock.mockImplementation((_id:Number) => { return new Promise((resolve, reject) => { console.log('heeeeeeeeeeeeeeyyyyyyyyyyyyyyyyy !!!'); resolve(new Pokemon()) }); })
                // mock.mockReturnValue(new Promise((resolve, reject) => { console.log('heeeeeeeeeeeeeeyyyyyyyyyyyyyyyyy !!!'); let p = new Pokemon(); p.id = 1; resolve(p); }));

                await supertest(app).get(`/api/pokemon/1`).set('Authorization', 'bearer ' + token).expect(200).then((res) => {
                    console.log(res.body.data);
                    expect(res.body.data[0].id).toBe(1);
                });
            });
        })
    });
});