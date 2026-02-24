const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 2) Motor de vistas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 3) Parciales (views/partials)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// 4) Helper
hbs.registerHelper('priorityClass', function(priority) {
  if (priority === 'alta') return 'priority-high';
  if (priority === 'media') return 'priority-medium';
  return 'priority-low';
});

// 5) Rutas
app.get('/perfil', (req, res) => {
  res.render('perfil', {
    nombre: 'Ana',
    profesion: 'Desarrolladora Web'
  });
});

app.get('/dashboard', (req, res) => {
  const data = {
    user: {
      name: 'Carlos',
      isAdmin: true
    },
    projects: [
      {
        name: 'API Gateway',
        isCompleted: false,
        tasks: [
          { description: 'Diseñar endpoints', priority: 'alta' },
          { description: 'Implementar JWT', priority: 'alta' },
          { description: 'Crear documentación', priority: 'media' }
        ]
      },
      {
        name: 'Refactor del Frontend',
        isCompleted: true,
        tasks: [
          { description: 'Migrar a React 18', priority: 'baja' },
          { description: 'Actualizar dependencias', priority: 'baja' }
        ]
      },
      {
        name: 'Base de Datos',
        isCompleted: false,
        tasks: []
      }
    ]
  };

  res.render('dashboard', data);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});