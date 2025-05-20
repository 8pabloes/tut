package tfc.tut.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;

    private double total;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "coche_id")
    private Coche coche;

    public Pedido() {}

    public Pedido(Long id, LocalDate fecha, double total, Usuario usuario, Coche coche) {
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.usuario = usuario;
        this.coche = coche;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public LocalDate getFecha() { return fecha; }

    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public double getTotal() { return total; }

    public void setTotal(double total) { this.total = total; }

    public Usuario getUsuario() { return usuario; }

    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Coche getCoche() { return coche; }

    public void setCoche(Coche coche) { this.coche = coche; }
}
