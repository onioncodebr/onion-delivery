package br.com.onioncode.delivery.repository;

import br.com.onioncode.delivery.domain.Motoboy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MotoboyRepository extends JpaRepository<Motoboy, Long> {
    List<Motoboy> findByNameContainingIgnoreCase(String param);
}
