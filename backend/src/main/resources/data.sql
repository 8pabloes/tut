-- =======================
-- USUARIOS
-- =======================
INSERT INTO usuarios (id, nombre, email, password) VALUES
(1, 'Pablo', 'pablo@email.com', '1234'),
(2, 'María', 'maria@email.com', '5678'),
(3, 'Carlos', 'carlos@email.com', 'abcd'),
(4, 'Laura', 'laura@email.com', 'laura123');


-- =======================
-- COCHES
-- =======================
INSERT INTO coches (marca, modelo, año, precio, tipo, estado, stock, descripcion) VALUES
('Subaru', 'Impreza WRX', 2001, 25000, 'rally', 'disponible', 5, 'Tracción total, histórico en WRC.'),
('Mitsubishi', 'Lancer Evo VI', 2000, 28000, 'rally', 'disponible', 3, 'Evo clásico, homologado para competición.'),
('Ford', 'Escort RS Cosworth', 1994, 32000, 'clásico', 'disponible', 2, 'Coche de grupo A, ideal para rally vintage.'),
('Peugeot', '205 T16', 1985, 60000, 'clásico', 'vendido', 0, 'Grupo B original, restaurado completamente.'),
('Toyota', 'Celica GT-Four', 1998, 27000, 'rally', 'reservado', 1, 'Campeón del mundial de rally en los 90.'),
('Lancia', 'Delta Integrale', 1992, 29000, 'clásico', 'disponible', 1, 'Icono de los rallies de los 90.');

-- =======================
-- IMÁGENES
-- =======================
INSERT INTO imagenes (id, url, coche_id) VALUES
(1, 'https://tuweb.com/subaru-frontal.jpg', 1),
(2, 'https://tuweb.com/lancer-frontal.jpg', 2),
(3, 'https://tuweb.com/escort-frontal.jpg', 3),
(4, 'https://tuweb.com/peugeot-205.jpg', 4),
(5, 'https://tuweb.com/celica-gt4.jpg', 5),
(6, 'https://tuweb.com/escort-lateral.jpg', 3),
(7, 'https://tuweb.com/lancia-delta.jpg', 6);

-- =======================
-- FAVORITOS
-- =======================
INSERT INTO favoritos (id, usuario_id, coche_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(4, 3, 3),
(5, 4, 2),
(6, 4, 5);

-- =======================
-- PEDIDOS (opcional)
-- =======================
-- Puedes dejar vacío o añadir algunos si ya has creado pedidos desde Postman
