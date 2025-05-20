package tfc.tut.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tfc.tut.entities.ImagenCoche;

public interface ImagenCocheRepository extends JpaRepository<ImagenCoche, Long> {
    // Aquí puedes añadir búsquedas personalizadas si quieres en el futuro
}

