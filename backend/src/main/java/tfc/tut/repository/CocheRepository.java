package tfc.tut.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tfc.tut.entities.Coche;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CocheRepository extends JpaRepository<Coche, Long> {

    // Buscar coches filtrando por marca, tipo, estado o precio
    @Query("SELECT c FROM Coche c WHERE " +
        "(:marca IS NULL OR LOWER(c.marca) = LOWER(:marca)) AND " +
        "(:tipo IS NULL OR LOWER(c.tipo) = LOWER(:tipo)) AND " +
        "(:estado IS NULL OR LOWER(c.estado) = LOWER(:estado)) AND " +
        "(:precioMin IS NULL OR c.precio >= :precioMin) AND " +
        "(:precioMax IS NULL OR c.precio <= :precioMax)")
List<Coche> filtrarCoches(
        @Param("marca") String marca,
        @Param("tipo") String tipo,
        @Param("estado") String estado,
        @Param("precioMin") Double precioMin,
        @Param("precioMax") Double precioMax
);

}
