package tfc.tut.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tfc.tut.entities.Favorito;

import java.util.List;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    List<Favorito> findByUsuarioId(Long usuarioId);
}

