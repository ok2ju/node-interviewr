import users from './users';
import companies from './companies.js';
import vacancies from './vacancies.js';

export default function(app) {
  app.route('/api/v1/hearbeat')
    .get(users.heartbeat);

  app.route('/api/v1/login')
    .post(users.login);

  app.route('/api/v1/users')
    .get(users.list)
    .post(users.create);

  app.route('/api/v1/users/:id')
    .get(users.get)
    .put(users.update)
    .delete(users.remove);

  app.route('/api/v1/companies')
    .get(companies.list)
    .post(companies.create);

  app.route('/api/v1/companies/:id')
    .get(companies.getOne)
    .put(companies.update)
    .delete(companies.remove);

  app.route('/api/v1/vacancies')
    .get(vacancies.list)
    .post(vacancies.create);
}
