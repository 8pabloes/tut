package tfc.tut.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "favoritos")
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "coche_id")
    private Coche coche;

    public Favorito() {}

    public Favorito(Long id, Usuario usuario, Coche coche) {
        this.id = id;
        this.usuario = usuario;
        this.coche = coche;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }

    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Coche getCoche() { return coche; }

    public void setCoche(Coche coche) { this.coche = coche; }
}
