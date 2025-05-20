package tfc.tut.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tfc.tut.entities.Pedido;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioId(Long usuarioId);
}
