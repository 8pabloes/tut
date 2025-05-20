package tfc.tut.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tfc.tut.entities.Pedido;
import tfc.tut.entities.Usuario;
import tfc.tut.entities.Coche;
import tfc.tut.repository.PedidoRepository;
import tfc.tut.repository.UsuarioRepository;
import tfc.tut.repository.CocheRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CocheRepository cocheRepository;

    @PostMapping
public ResponseEntity<?> crearPedido(@RequestParam Long usuarioId, @RequestParam Long cocheId) {
    Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
    Coche coche = cocheRepository.findById(cocheId).orElseThrow();

    if (coche.getStock() <= 0) {
        return ResponseEntity.badRequest().body("No hay stock disponible para este coche.");
    }

    Pedido pedido = new Pedido();
    pedido.setUsuario(usuario);
    pedido.setCoche(coche);
    pedido.setFecha(LocalDate.now());
    pedido.setTotal(coche.getPrecio());

    // Restar stock
    coche.setStock(coche.getStock() - 1);

    // Si el stock llega a 0, cambiar estado a "vendido"
    if (coche.getStock() == 0) {
        coche.setEstado("vendido");
    }

    cocheRepository.save(coche);
    pedidoRepository.save(pedido);

    return ResponseEntity.ok(pedido);
}


    @GetMapping("/usuario/{usuarioId}")
    public List<Pedido> getPedidosUsuario(@PathVariable Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId);
    }
}
