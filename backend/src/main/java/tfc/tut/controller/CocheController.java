package tfc.tut.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tfc.tut.entities.Coche;
import tfc.tut.repository.CocheRepository;

import java.util.List;

@RestController
@RequestMapping("/coches")
public class CocheController {

    @Autowired
    private CocheRepository cocheRepository;

    // Devuelve coches filtrados por marca, tipo, estado y precio
    @GetMapping
    public List<Coche> filtrarCoches(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax
    ) {
        return cocheRepository.filtrarCoches(marca, tipo, estado, precioMin, precioMax);
    }
}
