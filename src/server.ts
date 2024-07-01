
import { createServer, Model, Response } from 'miragejs';

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
};

export function makeServer() {
  return createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    seeds(server) {
      server.create('user', { id: "1", name: 'John Doe', email: 'john@example.com', age: 30, city: 'New York' });
      server.create('user', { id: "2", name: 'Jane Smith', email: 'jane@example.com', age: 25, city: 'San Francisco' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', (schema) => {
        return schema.all('user');
      });

      this.get('/users/:id', (schema, request) => {
        const id = request.params.id;
        const user = schema.find('user', id);
        if (user) {
          return user;
        } else {
          return new Response(404, {}, { error: 'User not found' });
        }
      });

      this.post('/users', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('user', attrs);
      });

      this.put('/users/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const user = schema.find('user', id);

        if (user) {
          user.update(attrs);
          return user;
        } else {
          return new Response(404, {}, { error: 'User not found' });
        }
      });

      this.del('/users/:id', (schema, request) => {
        const id = request.params.id;
        const user = schema.find('user', id);
        if (user) {
          user.destroy();
          return new Response(204);
        } else {
          return new Response(404, {}, { error: 'User not found' });
        }
      });

      this.passthrough((request) => {
        if (request.url === 'http://localhost:3001') {
          return true;
        }
        return false;
      });
    },
  });
}
