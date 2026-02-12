package br.com.onioncode.delivery.controller;

import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.dto.entrega.EntregaCreateDTO;
import br.com.onioncode.delivery.dto.entrega.EntregaResponseDTO;
import br.com.onioncode.delivery.service.EntregaService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/entrega")
public class EntregaController {

    private final EntregaService entregaService;

    @PostMapping
    public ResponseEntity<EntregaResponseDTO> save(@RequestBody EntregaCreateDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(entregaService.save(dto));
    }

}
