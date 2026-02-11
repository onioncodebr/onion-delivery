package br.com.onioncode.delivery.controller;

import br.com.onioncode.delivery.domain.Diaria;
import br.com.onioncode.delivery.dto.diaria.DiariaCreateDTO;
import br.com.onioncode.delivery.dto.diaria.DiariaResponseDTO;
import br.com.onioncode.delivery.dto.motoboy.MotoboyResponseDTO;
import br.com.onioncode.delivery.service.DiariaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaria")
@RequiredArgsConstructor
public class DiariaController {

    private final DiariaService diariaService;
    @PostMapping
    public ResponseEntity<DiariaResponseDTO> save(@RequestBody Long motodoyId){
        return ResponseEntity.status(HttpStatus.CREATED).body(diariaService.save(motodoyId));
    }
    @GetMapping
    public ResponseEntity<List<DiariaResponseDTO>>  getAll(@RequestBody Long motodoyId){
        return ResponseEntity.status(HttpStatus.OK).body(diariaService.getByMotoboy(motodoyId));
    }
}
