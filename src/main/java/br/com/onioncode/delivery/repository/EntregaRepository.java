package br.com.onioncode.delivery.repository;

import br.com.onioncode.delivery.domain.Entrega;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EntregaRepository extends JpaRepository<Entrega, Long> {

}
