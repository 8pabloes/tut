package tfc.tut.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tfc.tut.entities.Coche;
import tfc.tut.entities.Pedido;
import tfc.tut.entities.Usuario;
import tfc.tut.repository.CocheRepository;
import tfc.tut.repository.PedidoRepository;
import tfc.tut.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CocheRepository cocheRepository;

    // GUARDAR PEDIDO
    @PostMapping
    public Pedido crearPedido(@RequestBody PedidoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId()).orElse(null);
        if (usuario == null) return null;

        List<Coche> coches = cocheRepository.findAllById(request.getCocheIds());
        double total = coches.stream().mapToDouble(Coche::getPrecio).sum();

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setCoches(coches);
        pedido.setFecha(LocalDate.now());
        pedido.setTotal(total);

        return pedidoRepository.save(pedido);
    }

    // VER PEDIDOS DE UN USUARIO
    @GetMapping("/usuario/{usuarioId}")
    public List<Pedido> getPedidosPorUsuario(@PathVariable Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId);
    }

    // DTO para recibir el pedido
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
