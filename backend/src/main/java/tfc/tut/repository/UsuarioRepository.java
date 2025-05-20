package tfc.tut.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tfc.tut.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email); // para el login en el futuro
}
