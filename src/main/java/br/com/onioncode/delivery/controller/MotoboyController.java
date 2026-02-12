package br.com.onioncode.delivery.controller;

import br.com.onioncode.delivery.domain.Motoboy;
import br.com.onioncode.delivery.dto.motoboy.MotoboyCreateDTO;
import br.com.onioncode.delivery.dto.motoboy.MotoboyResponseDTO;
import br.com.onioncode.delivery.dto.motoboy.MotoboyUpdateDTO;
import br.com.onioncode.delivery.service.MotoboyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/motoboys")
public class MotoboyController {

    private final MotoboyService motoboyService;

    @PostMapping()
    public ResponseEntity<MotoboyResponseDTO> CreateMotoboy(@RequestBody MotoboyCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(motoboyService.save(dto));
    }

    @GetMapping()
    public ResponseEntity<List<MotoboyResponseDTO>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(motoboyService.findAll());
    }
    @GetMapping("/{name}")
    public ResponseEntity<List<Motoboy>> findByName(@PathVariable String name) {
        return ResponseEntity.status(HttpStatus.OK).body(motoboyService.findByName(name));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Motoboy> update(@PathVariable Long id, @RequestBody MotoboyUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(motoboyService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        motoboyService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
