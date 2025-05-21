package tfc.tut.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tfc.tut.entities.Favorito;
import tfc.tut.entities.Usuario;
import tfc.tut.entities.Coche;
import tfc.tut.repository.FavoritoRepository;
import tfc.tut.repository.UsuarioRepository;
import tfc.tut.repository.CocheRepository;

import java.util.List;

@RestController
@RequestMapping("/favoritos")
public class FavoritoController {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CocheRepository cocheRepository;

    @PostMapping
    public Favorito crearFavorito(@RequestParam Long usuarioId, @RequestParam Long cocheId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
        Coche coche = cocheRepository.findById(cocheId).orElseThrow();
        Favorito favorito = new Favorito();
        favorito.setUsuario(usuario);
        favorito.setCoche(coche);
        return favoritoRepository.save(favorito);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Favorito> getFavoritosByUsuario(@PathVariable Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId);
    }

    @DeleteMapping("/{id}")
public void eliminarFavorito(@PathVariable Long id) {
    favoritoRepository.deleteById(id);
}

}
