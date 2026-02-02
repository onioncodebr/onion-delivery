package br.com.onioncode.delivery.controller;

import br.com.onioncode.delivery.domain.Entrega;
import br.com.onioncode.delivery.dto.EntregaCreateDTO;
import br.com.onioncode.delivery.service.EntregaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/entregas")
public class EntregaController {

    @Autowired
    private EntregaService entreServ;

    @PostMapping("/{motoboyId}")
    public ResponseEntity<Entrega> create(@PathVariable Long motoboId, EntregaCreateDTO dto){
        return ResponseEntity.status(HttpStatus.OK).body(entreServ.create(motoboId, dto));
    }

}
