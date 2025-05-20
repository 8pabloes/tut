package tfc.tut.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tfc.tut.entities.ImagenCoche;
import tfc.tut.repository.ImagenCocheRepository;
import tfc.tut.repository.CocheRepository;
import tfc.tut.entities.Coche;

import java.util.List;

@RestController
@RequestMapping("/imagenes")
public class ImagenCocheController {

    @Autowired
    private ImagenCocheRepository imagenCocheRepository;

    @Autowired
    private CocheRepository cocheRepository;

    @GetMapping
    public List<ImagenCoche> getAllImagenes() {
        return imagenCocheRepository.findAll();
    }

    @PostMapping("/{idCoche}")
    public ImagenCoche añadirImagen(@PathVariable Long idCoche, @RequestBody ImagenCoche imagen) {
        Coche coche = cocheRepository.findById(idCoche).orElseThrow();
        imagen.setCoche(coche);
        return imagenCocheRepository.save(imagen);
    }
}

