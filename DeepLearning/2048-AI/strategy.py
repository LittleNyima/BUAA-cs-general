class StrategyAI:

    def __init__(self, game):
        print("smart_ai init")
        self.game = game

    def next_move(self):
        # start = time.time()
        original_quality = self.grid_quality(self.game)
        # end = time.time()
        # print(end - start)
        # start = time.time()
        results = self.plan_ahead(self.game, 3, original_quality)
        # end = time.time()
        # print(end - start)
        # start = time.time()
        bestResult = self.choose_best_move(results, original_quality)
        # end = time.time()
        # print(end - start)
        return bestResult["direction"]

    def plan_ahead(self, game, n_moves, original_quality):
        results = [0, 0, 0, 0]

        for d in range(4):
            testGame = game.copy()
            moved = testGame.move(d)

            if moved == 0:
                results[d] = None
                continue

            result = {
                "quality": -1,
                "probability": 1,
                "qualityLoss": 0,
                "direction": d
            }

            availableCells = testGame.available_cells()

            for i in range(len(availableCells)):
                hasAdjacentTile = False

                for d2 in range(4):
                    vector = testGame.get_vector(d2)
                    adjCell = {
                        "x": availableCells[i]["x"] + vector["x"],
                        "y": availableCells[i]["y"] + vector["y"]
                    }
                    if testGame.cell_content(adjCell):
                        hasAdjacentTile = True
                        break

                if not hasAdjacentTile:
                    continue

                testGame2 = testGame.copy()
                testGame2.add_tile(availableCells[i], 2)
                if n_moves > 1:
                    subResult = self.plan_ahead(testGame2, n_moves - 1, original_quality)
                    tileResult = self.choose_best_move(subResult, original_quality)
                else:
                    tileQuality = self.grid_quality(testGame2)
                    tileResult = {
                        "quality": tileQuality,
                        "probability": 1,
                        "qualityLoss": max(original_quality - tileQuality, 0)
                    }

                if (result["quality"] == -1 or tileResult["quality"] < result["quality"]):
                    result["quality"] = tileResult["quality"]
                    result["probability"] = tileResult["probability"] / len(availableCells)
                elif (tileResult["quality"] == result["quality"]):
                    result["probability"] += tileResult["probability"] / len(availableCells)

                result["qualityLoss"] += tileResult["qualityLoss"] / len(availableCells)

            results[d] = result

        return results

    def choose_best_move(self, results, original_quality):
        bestResult = None
        for i in range(len(results)):
            if results[i] == None:
                continue
            if (not bestResult or results[i]["qualityLoss"] < bestResult["qualityLoss"] or
                    (results[i]["qualityLoss"] == bestResult["qualityLoss"] and results[i]["quality"] > bestResult[
                        "quality"]) or
                    (results[i]["qualityLoss"] == bestResult["qualityLoss"] and results[i]["quality"] == bestResult[
                        "quality"] and results[i]["probability"] < bestResult["probability"])):
                bestResult = results[i]

        if not bestResult:
            bestResult = {
                "quality": -1,
                "probability": 1,
                "qualityLoss": original_quality,
                "direction": 0
            }

        return bestResult

    def grid_quality(self, game):
        monoScore = 0
        traversals = self.game.build_traversals({"x": -1, "y": 0})
        prevValue = -1
        incScore = 0
        decScore = 0

        def score_cell(cell, inc_score, dec_score, prev_value):
            tile = game.cell_content(cell)
            tile_value = game.grid[cell["x"], cell["y"]] if tile else 0
            inc_score += tile_value
            if (tile_value <= prev_value or prev_value == -1):
                dec_score += tile_value
                if (tile_value < prev_value):
                    inc_score -= prev_value
            prev_value = tile_value
            return inc_score, dec_score, prev_value

        for x in traversals["x"]:
            prevValue = -1
            incScore = 0
            decScore = 0
            for y in traversals["y"]:
                incScore, decScore, prevValue = score_cell({"x": x, "y": y}, incScore, decScore, prevValue)
            monoScore += max(incScore, decScore)

        for y in traversals["y"]:
            prevValue = -1
            incScore = 0
            decScore = 0
            for x in traversals["x"]:
                incScore, decScore, prevValue = score_cell({"x": x, "y": y}, incScore, decScore, prevValue)
            monoScore += max(incScore, decScore)

        availableCells = game.available_cells()
        emptyCellWeight = 8
        emptyScore = len(availableCells) * emptyCellWeight

        score = monoScore + emptyScore

        return score
