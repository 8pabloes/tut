package tfc.tut.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tfc.tut.entities.Coche;

import java.util.List;

public interface CocheRepository extends JpaRepository<Coche, Long> {

    @Query("SELECT c FROM Coche c WHERE " +
            "(:marca IS NULL OR c.marca = :marca) AND " +
            "(:tipo IS NULL OR c.tipo = :tipo) AND " +
            "(:estado IS NULL OR c.estado = :estado) AND " +
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
