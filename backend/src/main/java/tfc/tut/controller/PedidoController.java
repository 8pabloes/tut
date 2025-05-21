package tfc.tut.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tfc.tut.entities.Coche;
import tfc.tut.entities.Pedido;
import tfc.tut.entities.Usuario;
import tfc.tut.repository.CocheRepository;
import tfc.tut.repository.PedidoRepository;
import tfc.tut.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private CocheRepository cocheRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // POST: crear un pedido con varios coches
    @PostMapping
    public ResponseEntity<String> crearPedido(@RequestBody PedidoRequest request) {
        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDate.now());

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId()).orElse(null);
        pedido.setUsuario(usuario);

        List<Coche> coches = cocheRepository.findAllById(request.getCocheIds());
        pedido.setCoches(coches);

        double total = coches.stream().mapToDouble(Coche::getPrecio).sum();
        pedido.setTotal(total);

        pedidoRepository.save(pedido);
        return ResponseEntity.ok("Pedido guardado correctamente");
    }
    @GetMapping("/usuario/{usuarioId}")
public ResponseEntity<List<Pedido>> obtenerPedidosPorUsuario(@PathVariable Long usuarioId) {
    List<Pedido> pedidos = pedidoRepository.findByUsuarioId(usuarioId);
    return ResponseEntity.ok(pedidos);
}


    // Clase interna para recibir el JSON del carrito
    public static class PedidoRequest {
        private Long usuarioId;
        private List<Long> cocheIds;

        public Long getUsuarioId() {
            return usuarioId;
        }

        public void setUsuarioId(Long usuarioId) {
            this.usuarioId = usuarioId;
        }

        public List<Long> getCocheIds() {
            return cocheIds;
        }

        public void setCocheIds(List<Long> cocheIds) {
            this.cocheIds = cocheIds;
        }
    }
}
